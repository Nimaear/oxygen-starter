//@flow
import axios from 'axios';
import { API } from 'Config';
import https from 'https';

export default {
  rest: (url, data = {}, method = 'POST') => {
    return axios({
      url: `${API.base}/${API.rest}/${url}`,
      method,
      data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(async (response) => {
      if (response.status >= 400) {
        throw new Error();
      }
      return response.data;
    });
  },
  graphql: (operationName, query, variables = {}) => {
    return axios({
      url: `${API.base}/${API.graphQl}`,
      method: 'POST',
      data: {
        operationName,
        query,
        variables,
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(async (response) => {
      if (response.status >= 400) {
        throw new Error();
      }
      return response.data.data;
    });
  },
};
