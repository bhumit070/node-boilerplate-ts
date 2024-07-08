import { Response } from 'express';

export type CustomResponse = {
  res: Response;
  code?: number;
  data?: unknown;
  message?: string;
  error?: boolean;
};

function handleData(
  data: Omit<CustomResponse, 'res'>,
  isError: boolean = false
) {
  if (!data.data) {
    data.data = {};
  }

  data.message = data?.message || (isError ? 'Error' : 'Success');
  data.error = isError;
}

function success({ res, ...data }: CustomResponse) {
  data.code = data.code || 200;
  handleData(data);
  return res.status(data.code).json(data.data);
}
function error({ res, ...data }: CustomResponse) {
  data.code = data.code || 500;
  handleData(data, true);
  return res.status(data.code).json(data);
}

export default {
  success,
  error,
};
