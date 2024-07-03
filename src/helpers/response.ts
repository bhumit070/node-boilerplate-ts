import { Response } from 'express';

export type CustomResponseData = {
  message?: string;
  data?: unknown;
  error?: boolean;
};

export type CustomResponse = {
  res: Response;
  code?: number;
  data?: CustomResponseData;
};

function handleData(data: CustomResponse, isError: boolean = false) {
  if (!data.data) {
    data.data = {};
  }

  data.data.message = data.data?.message || (isError ? 'Error' : 'Success');
  data.data.error = isError;
}

function success(data: CustomResponse) {
  data.code = data.code || 200;
  handleData(data);
  return data.res.status(data.code).json(data.data);
}
function error(data: CustomResponse) {
  data.code = data.code || 500;
  handleData(data, true);
  return data.res.status(data.code).json(data.data);
}

export default {
  success,
  error,
};
