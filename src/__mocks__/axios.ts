import { Axios } from "axios";

const mock: Axios = {
  defaults: {
    headers: {
      common: {},
      delete: {},
      get: {},
      head: {},
      post: {},
      put: {},
      patch: {},
    },
  },
  interceptors: {
    request: {
      use: jest.fn(),
      eject: jest.fn(),
      clear: jest.fn(),
    },
    response: {
      use: jest.fn(),
      eject: jest.fn(),
      clear: jest.fn(),
    },
  },
  get: jest.fn(),
  post: jest.fn(),
  getUri: jest.fn(),
  request: jest.fn(),
  delete: jest.fn(),
  head: jest.fn(),
  options: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  postForm: jest.fn(),
  putForm: jest.fn(),
  patchForm: jest.fn(),
};

export default mock;
