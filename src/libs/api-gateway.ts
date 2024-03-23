import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export const sendSuccessfulResponse = (
  message: string
): APIGatewayProxyResult => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `${message}` }),
  };
};

export const sendSuccessfulCreateResponse = (
  response: Record<string, unknown>
): APIGatewayProxyResult => {
  return {
    statusCode: 201,
    body: JSON.stringify(response),
  };
};

export const sendInternalServerErrorResponse = (
  message: string
): APIGatewayProxyResult => {
  return {
    statusCode: 500,
    body: JSON.stringify({ message: `${message}` }),
  };
};

export const sendForbiddenErrorResponse = (
  message: string
): APIGatewayProxyResult => {
  return {
    statusCode: 403,
    body: JSON.stringify({ message: `${message}` }),
  };
};

export const sendNotFoundErrorResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 404,
    body: JSON.stringify(response)
  }
}

export const sendBadRequestResponse = (
  message: string
): APIGatewayProxyResult => {
  return {
    statusCode: 400,
    body: JSON.stringify({ message: `Invalid Request Body. ${message}` }),
  };
};
