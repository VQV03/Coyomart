import api from './axios';

const authHeader = {
  headers: {
    Accept: 'application/vnd.api+json',
    'content-type': 'application/vnd.api+json',
  },
};

const body = {
  body: {
    name: 'Vitor Queiroz',
  },
};

async function getAuth() {
  return api.post('/auths', body, authHeader).then((response) => {
    return response.data.token;
  });
}

const headers = {
  headers: {
    Accept: 'application/vnd.api+json',
    Authorization: `Bearer ${await getAuth()}`,
  },
};

export default headers;
