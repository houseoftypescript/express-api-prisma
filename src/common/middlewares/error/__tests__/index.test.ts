import { Request, Response } from 'express';
import { ValidateError } from 'tsoa';
import { errorHandler } from '..';

describe('errorHandler', () => {
  const mockResponse = (): Response => {
    const res: Response = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('should return validate error', () => {
    const error = new ValidateError({}, 'error message');
    const mockedRequest = {} as Request;
    const mockedResponse = mockResponse();
    const nextFunction = jest.fn();

    errorHandler(error, mockedRequest, mockedResponse, nextFunction);

    expect(mockedResponse.status).toBeCalled();
    expect(mockedResponse.json).toBeCalled();
  });

  it('should return error', () => {
    const error = new Error('error message');
    const mockedRequest = {} as Request;
    const mockedResponse = mockResponse();
    const nextFunction = jest.fn();

    errorHandler(error, mockedRequest, mockedResponse, nextFunction);

    expect(mockedResponse.status).toBeCalled();
    expect(mockedResponse.json).toBeCalled();
  });

  it('should return error', () => {
    const error = new Error();
    const mockedRequest = {} as Request;
    const mockedResponse = mockResponse();
    const nextFunction = jest.fn();

    errorHandler(error, mockedRequest, mockedResponse, nextFunction);

    expect(mockedResponse.status).toBeCalled();
    expect(mockedResponse.json).toBeCalled();
  });

  it('should continue', () => {
    const mockedRequest = {} as Request;
    const mockedResponse = mockResponse();
    const nextFunction = jest.fn();

    errorHandler(undefined, mockedRequest, mockedResponse, nextFunction);

    expect(nextFunction).toBeCalled();
  });
});
