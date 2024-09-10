import joinUrlPath from './joinUrlPath'

import {
  doPost,
  doGet,
  doGetById,
  doPut,
  doPatch,
  doDelete,
} from './apiCallers'

const getDefaultParams = () => {
  return {}
}

// const getToken = () =>
//   localStorage.getItem(
//     'CognitoIdentityServiceProvider.5ibpo3jkmboi3hn51qt8usrdi1.c124b7e6-ba29-48a3-86e4-d26f951ca915.idToken'
//   );

class ApiService {
  _url = ''

  constructor(url) {
    this._url = url
    this._headers = {}

    this.cancelToken = ''

    this.doPost = doPost

    this.doGet = doGet
    this.doGetById = doGetById

    this.doPut = doPut
    this.doPatch = doPatch

    this.doDelete = doDelete
  }

  post(path, payload, params, headers) {
    console.log(joinUrlPath(this._url, path))

    return doPost(joinUrlPath(this._url, path), payload, params, {
      ...this._headers,
      ...headers,
    })
  }

  get(path, params, headers, noOrgId) {
    const _params = { ...params, ...getDefaultParams() }

    if (noOrgId) delete _params.organizationId

    return this.doGet(
      joinUrlPath(this._url, path),
      _params,
      { ...this._headers, ...headers },
      this.cancelToken
    )
  }

  getById(path, id, params, headers) {
    const _params = { ...params, _id: id, ...getDefaultParams() }
    return this.doGetById(joinUrlPath(this._url, path), _params, {
      ...this._headers,
      ...headers,
    })
  }

  put(path, id, payload, params, headers) {
    return this.doPut(
      joinUrlPath(joinUrlPath(this._url, path), id),
      payload,
      params,
      {
        ...this._headers,
        ...headers,
      }
    )
  }

  delete(path, id, params, headers) {
    return this.doDelete(
      joinUrlPath(joinUrlPath(this._url, path), id),
      params,
      {
        ...this._headers,
        ...headers,
      }
    )
  }

  patch(path, id, payload, params, headers) {
    return this.doPatch(
      joinUrlPath(joinUrlPath(this._url, path), id),
      payload,
      params,
      {
        ...this._headers,
        ...headers,
      }
    )
  }
}

export default ApiService
