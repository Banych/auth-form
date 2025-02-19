import { LoginSchema } from '@schemas/login-schema'
import { RegisterSchema } from '@schemas/register-schema'

export type UserDTO = Omit<RegisterSchema, 'passwordConfirmation'> & {
  id: number
}

export type User = Omit<LoginSchema, 'password'> & {
  id: number
  username: string
}
