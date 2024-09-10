import axios, { AxiosResponse, AxiosRequestHeaders } from 'axios'

class BaseService {
  // Axios instance for making requests
  private axiosInstance = axios.create({
    baseURL: 'https://api-dev.desklinq.com/v1',
    // baseURL: "http://localhost:9090/v1",
  })
  //create a getToken method to get the token from localStorage
  getToken() {
    //get the token from localStorage
    const token = localStorage.getItem('token')

    return token
  }
  // create a getHeaders method to return the headers
  // create a getHeaders method to return the headers
  getHeaders(): AxiosRequestHeaders {
    const token = this.getToken()
    let parsedToken = null
    try {
      parsedToken = token ? JSON.parse(token) : null
    } catch (error) {
      console.error('Error parsing token:', error)
    }

    const accessToken = parsedToken ? parsedToken.access.token : null

    let headers: AxiosRequestHeaders = {}
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`
    }
    return headers
  }

  // Generic method for making GET requests
  public async doGet<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(url, {
      headers: this.getHeaders(),
    })
    return response.data
  }

  // Generic method for making POST requests
  public async doPost<T>(url: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(
      url,
      data,
      { headers: this.getHeaders() }
    )
    return response.data
  }

  // Generic method for making PUT requests
  public async doPut<T>(url: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, {
      headers: this.getHeaders(),
    })
    return response.data
  }

  // Generic method for making DELETE requests
  public async doDelete<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(url, {
      headers: this.getHeaders(),
    })
    return response.data
  }
  public async getUsername(userId: string): Promise<string> {
    const userDetails = await this.doGet<any>(`/users/${userId}`)
    const username = `${userDetails.data.firstName} ${userDetails.data.lastName}`
    return username // Replace with the actual path to the username in the response
  }
}

export default BaseService
