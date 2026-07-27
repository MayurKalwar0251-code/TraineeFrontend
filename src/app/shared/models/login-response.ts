import { UserDto } from "./user-dto"

export interface LoginResponse {
    userDto: UserDto 
    expireIn: string
    token: string
}