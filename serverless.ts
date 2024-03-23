import type { AWS } from '@serverless/typescript';
import { createPlanet, getAllPlanets, getPlanetById, getDataPlanetById } from '@functions/planet';

const serverlessConfiguration: AWS = {
  service: 'reto-rimac-aws-typescript-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dynamodb'],
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [{
          Effect: "Allow",
          Action: [
            "dynamodb:DescribeTable",
            "dynamodb:Query",
            "dynamodb:Scan",
            "dynamodb:GetItem",
            "dynamodb:PutItem",
            "dynamodb:UpdateItem",
            "dynamodb:DeleteItem",
          ],
          Resource: "arn:aws:dynamodb:us-east-1:*:table/PlanetsTable",
        }],
      },

    },
  },
  // import the function via paths
  functions: { createPlanet, getAllPlanets, getPlanetById, getDataPlanetById },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb:{
      start:{
        port: 8000,
        inMemory: true,
        migrate: true,
        //noStart: true
      },
      stages: "dev"
    }
  },
  resources: {
    Resources: {
      PlanetsTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "PlanetsTable",
          AttributeDefinitions: [{
            AttributeName: "planetId",
            AttributeType: "S",
          }],
          KeySchema: [{
            AttributeName: "planetId",
            KeyType: "HASH"
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },
          
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
