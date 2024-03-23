import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse, sendNotFoundErrorResponse, sendSuccessfulCreateResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import planetsService from '../../services';
import createPlanetschema from '../schemas/createPlanetschema';
import { v4 as uuidv4 } from 'uuid';

const createPlanet: ValidatedEventAPIGatewayProxyEvent<typeof createPlanetschema> = async (event) => {
  try {
    const planet = await planetsService.createPlanet({
      planetId: uuidv4(),
      nombre: event.body.nombre,
      diametro: event.body.diametro,
      periodoRotacion: event.body.periodoRotacion,
      periodoOrbital: event.body.periodoOrbital,
      gravedad: event.body.gravedad,
      poblacion: event.body.poblacion,
      clima: event.body.clima,
      terreno: event.body.terreno,
      aguaSuperficial: event.body.aguaSuperficial,
      residentes: event.body.residentes,
      peliculas: event.body.peliculas,
      url: event.body.url,
    })
    return sendSuccessfulCreateResponse({
      planet
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e
    });
  }
};

export const getAllPlanets = middyfy(async (): Promise<APIGatewayProxyResult> => {
  const planets = await planetsService.getAllPlanets();
  return formatJSONResponse({
    planets
  })
})

export const getPlanetById = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id;
  try {
    const planetFound = await planetsService.queryPlanet(id);
    if (!planetFound){
      return sendNotFoundErrorResponse({
        message: 'Planet Not Found'
      });
    }

      return formatJSONResponse({
        data: planetFound
      });
  } catch (e) {
      return formatJSONResponse({
          status: 500,
          message: e
      });
  }
})

export const getDataPlanetById = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id;
  try {
    const getDataPlanetByIdResponse = await planetsService.callApiGetDataPlanetById(id);
      return formatJSONResponse({
        data: getDataPlanetByIdResponse
      });
  } catch (e) {
      return formatJSONResponse({
          status: 500,
          message: e
      });
  }
})

export const createPlanetFun = middyfy(createPlanet);
