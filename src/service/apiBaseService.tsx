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

class ApiService {
  private _url: string
  private _headers: any
  private cancelToken: any
  private doPost: typeof doPost
  private doGet: typeof doGet
  private doGetById: typeof doGetById
  private doPut: typeof doPut
  private doPatch: typeof doPatch
  private doDelete: typeof doDelete

  constructor(url: string) {
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

  post<T>(payload: any, params?: any, headers?: any): Promise<T> {
    return this.doPost(this._url, payload, params, {
      ...this._headers,
      ...headers,
    })
  }

  get<T>(params?: any, headers?: any, noOrgId?: boolean): Promise<T> {
    const _params = { ...params, ...getDefaultParams() }

    if (noOrgId) delete _params.organizationId

    return this.doGet(
      this._url,
      _params,
      { ...this._headers, ...headers },
      this.cancelToken
    )
  }

  getById<T>(id: string, params?: any, headers?: any): Promise<T> {
    const _params = { ...params, _id: id, ...getDefaultParams() }
    return this.doGetById(this._url, _params, { ...this._headers, ...headers })
  }

  put<T>(id: string, payload: any, params?: any, headers?: any): Promise<T> {
    return this.doPut(joinUrlPath(this._url, id), payload, params, {
      ...this._headers,
      ...headers,
    })
  }

  delete<T>(id: string, params?: any, headers?: any): Promise<T> {
    return this.doDelete(joinUrlPath(this._url, id), params, {
      ...this._headers,
      ...headers,
    })
  }

  patch<T>(id: string, payload: any, params?: any, headers?: any): Promise<T> {
    return this.doPatch(joinUrlPath(this._url, id), payload, params, {
      ...this._headers,
      ...headers,
    })
  }
}

export default ApiService
