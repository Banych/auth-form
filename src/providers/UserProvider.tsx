import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useState,
} from 'react'

import { User } from '@models/user-type'
import fakeApiClient from '@api/client'
import { LoginSchema } from '@schemas/login-schema'
import { RegisterSchema } from '@schemas/register-schema'

export type UserContextType = {
  user: User | null
  login: (data: LoginSchema) => Promise<void>
  register: (data: RegisterSchema) => Promise<void>
  logout: () => void
  isLoading: boolean
}

export const UserContext = createContext<UserContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isLoading: false,
})

const UserProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (data: LoginSchema) => {
    setLoading(true)
    try {
      const response = await fakeApiClient.login(data)
      setUser(response)
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (data: RegisterSchema) => {
    setLoading(true)
    try {
      const response = await fakeApiClient.register(data)
      setUser(response)
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <UserContext.Provider
      value={{ user, login, register, logout, isLoading: loading }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
