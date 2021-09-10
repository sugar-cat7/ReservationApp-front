const api = {
  get: async (url: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_ROOT + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${sessionStorage.getItem('access_token')}`,
      },
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err);
    }
    return await response.json();
  },

  post: async (url: string, data: { [key: string]: string }) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_ROOT + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${sessionStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err);
    }
    return await response.json();
  },

  put: async (url: string, data: { [key: string]: string }) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_ROOT + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${sessionStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err);
    }
    return await response.json();
  },
};

export default api;
