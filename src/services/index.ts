import dynamoDBClient from "../model";
import PlanetService from "./planetsService"

const planetService = new PlanetService(dynamoDBClient());
export default planetService;