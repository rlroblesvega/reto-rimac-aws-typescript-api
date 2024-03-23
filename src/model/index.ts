import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDBClient = (): DynamoDBDocumentClient => {
  if (process.env.IS_OFFLINE) {
    const client = new DynamoDBClient({
      region: "localhost",
      endpoint: "http://localhost:8000"
    });
    const dynamo = DynamoDBDocumentClient.from(client);
    return dynamo
  }

  const client = new DynamoDBClient({});
  const dynamo = DynamoDBDocumentClient.from(client);
  return  dynamo;
};

export default dynamoDBClient
