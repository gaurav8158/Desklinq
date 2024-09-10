export interface User {
  firstName: string
  lastName: string
  isEmployee: boolean
  phone: string
  email: string
  isEnabled: boolean
  isPhoneVerified: boolean
  role: string
  isEmailVerified: boolean
  deleted: boolean
  wishlist: string[]
  id: string
}

export interface AccessToken {
  token: string
  expires: string
}

export interface RefreshToken {
  token: string
  expires: string
}

export interface Token {
  access?: AccessToken
  refresh?: RefreshToken
}

export interface UserData {
  user: User
  token: Token
  redirectURL: string
}
