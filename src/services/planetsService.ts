import Planet from "../model/Planet";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

export default class PlanetService {

    constructor(private docClient: DynamoDBDocumentClient) { }

    async getAllPlanets(): Promise<Planet[]> {
      const params:ScanCommand = new ScanCommand({
          TableName: "PlanetsTable",
          Limit: 20
      });
      const result = await this.docClient.send(params);
      return result.Items as Planet[];
  }

    async createPlanet(planet: Planet): Promise<Planet> {
        const command = new PutCommand({
          TableName: "PlanetsTable",
          Item: planet,
        });
        await this.docClient.send(command);
        return planet as Planet;
    }

  async queryPlanet(id: string): Promise<any> {
    const params: GetCommand = new GetCommand({
      TableName: "PlanetsTable",
      Key: {
        planetId: id,
      },
    });
    const response = await this.docClient.send(params);
    return response.Item as Planet;
  }

  async callApiGetDataPlanetById(id: string): Promise<any> {
    const { data } = await axios.get(`https://swapi.py4e.com/api/planets/${id}`);

    const dataPlanetById = {
      "planetId": uuidv4(),
      "nombre": data.name,
      "diametro": data.diameter,
      "periodoRotacion": data.rotation_period,
      "periodoOrbital": data.orbital_period,
      "gravedad": data.gravity,
      "poblacion": data.population,
      "clima": data.climate,
      "terreno": data.terrain,
      "aguaSuperficial": data.surface_water,
      "residentes": data.residents,
      "peliculas": data.films,
      "url": data.url
    }
    await this.createPlanet(dataPlanetById);
    return dataPlanetById
  }

}
