const { default: axios } = require('axios')

// axios.interceptors.request.use(
//   async (config) => {
//     const session = await Auth.currentSession();
//     const token = await session.getIdToken().getJwtToken();

//     if (token) config.headers.Authorization = token;

//     config.headers["Content-Type"] = "application/json";
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     if (error.response.status === 403) Auth.signOut();

//     return Promise.reject(error);
//   }
// );

export function doPost(url, payload, params, headers) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, payload, {
        params,
        headers,
      })
      .then(({ data }) => resolve(data))
      .catch((err) => reject(err?.response?.data))
  })
}

export function doGet(url, params, headers, cancelToken) {
  return new Promise((resolve, reject) => {
    if (cancelToken) cancelToken.cancel()

    axios
      .get(url, {
        params,
        headers,
        cancelToken,
      })
      .then(({ data }) => {
        resolve(data)
      })
      .catch((err) => reject(err?.response?.data))
  })
}

export function doGetById(url, params, headers, cancelToken) {
  return new Promise((resolve, reject) => {
    if (cancelToken) cancelToken.cancel()
    axios
      .get(url, { params, headers, cancelToken })
      .then(({ data }) => resolve({ ...data, data: data.data[0] }))
      .catch((err) => reject(err?.response?.data))
  })
}

export function doPut(url, payload, params, headers) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, payload, { params, headers })
      .then(({ data }) => resolve(data))
      .catch((err) => reject(err?.response?.data))
  })
}

export function doDelete(url, params, headers) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, { params, headers })
      .then(({ data }) => {
        resolve(data)
      })
      .catch((err) => {
        reject(err?.response?.data?.message)
        console.log(err)
      })
  })
}

export function doPatch(url, payload, params, headers) {
  return new Promise((resolve, reject) => {
    axios
      .patch(url, payload, { params, headers })
      .then(({ data }) => resolve(data))
      .catch((err) => reject(err?.response?.data?.message))
  })
}

const ApiCallers = {
  doPost,
  doGet,
  doGetById,
  doPut,
  doPatch,
  doDelete,
}

export default ApiCallers
