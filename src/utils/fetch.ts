import { FetchError } from './fetchError';

const API_ROOT =
  process.env.NODE_ENV == 'development'
    ? process.env.NEXT_PUBLIC_LOCAL_API_ROOT
    : process.env.NEXT_PUBLIC_PROD_API_ROOT;

const api = {
  get: async (url: string) => {
    const response = await fetch(API_ROOT + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${sessionStorage.getItem('access_token')}`,
      },
    });
    if (response.status !== 200) {
      const errMsg = FetchError(response.status);
      throw new Error(errMsg);
    }
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err);
    }
    return await response.json();
  },

  post: async (url: string, data: { [key: string]: any }, isCreateUser?: boolean) => {
    let headers;
    switch (isCreateUser) {
      case true:
        headers = {
          'Content-Type': 'application/json',
        };
        break;
      default:
        headers = {
          'Content-Type': 'application/json',
          Authorization: `${sessionStorage.getItem('access_token')}`,
        };
        break;
    }

    const response = await fetch(API_ROOT + url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });
    if (response.status !== 200) {
      const errMsg = FetchError(response.status);
      throw new Error(errMsg);
    }
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err);
    }
    return await response.json();
  },

  put: async (url: string, data: { [key: string]: any }) => {
    const response = await fetch(API_ROOT + url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${sessionStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(data),
    });

    if (response.status !== 200) {
      const errMsg = FetchError(response.status);
      throw new Error(errMsg);
    }
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err);
    }
  },

  delete: async (url: string) => {
    const response = await fetch(API_ROOT + url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${sessionStorage.getItem('access_token')}`,
      },
    });
    if (response.status !== 200) {
      const errMsg = FetchError(response.status);
      throw new Error(errMsg);
    }
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err);
    }
  },
};

export default api;
