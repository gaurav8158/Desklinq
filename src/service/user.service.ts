import { USER_URL } from './apiConfig'
import ApiService from './apiService'

class UserService extends ApiService {
  constructor() {
    super(USER_URL)
  }
}
const userServiceInstance = new UserService()
export default userServiceInstance
