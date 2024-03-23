
import { handlerPath } from '@libs/handler-resolver';
import createPlanetschema from '../schemas/createPlanetschema';


export const createPlanet = {
  handler: `${handlerPath(__dirname)}/handler.createPlanetFun`,
  layers: [
    'arn:aws:lambda:us-east-1:905418277705:layer:dependencias:1'
  ],
  events: [
      {
          http: {
              method: 'post',
              path: 'planet',
              request: {
                schemas: {
                  'application/json': createPlanetschema,
                },
              },
          },
      },
  ],
};

export const getAllPlanets = {
  handler: `${handlerPath(__dirname)}/handler.getAllPlanets`,
  layers: [
    'arn:aws:lambda:us-east-1:905418277705:layer:dependencias:1'
  ],
  events: [
      {
          http: {
              method: 'get',
              path: 'planet/',
          },
      },
  ],
};

export const getPlanetById = {
  handler: `${handlerPath(__dirname)}/handler.getPlanetById`,
  layers: [
    'arn:aws:lambda:us-east-1:905418277705:layer:dependencias:1'
  ],
  events: [
      {
          http: {
              method: 'get',
              path: 'planet/{id}',
          },
      },
  ],
}

export const getDataPlanetById = {
  handler: `${handlerPath(__dirname)}/handler.getDataPlanetById`,
  layers: [
    'arn:aws:lambda:us-east-1:905418277705:layer:dependencias:1'
  ],
  events: [
      {
          http: {
              method: 'get',
              path: 'planet/info/{id}',
          },
      },
  ],
}