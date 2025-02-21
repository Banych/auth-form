import { User, UserDTO } from '@models/user-type'
import { LoginSchema } from '@schemas/login-schema'
import { RegisterSchema } from '@schemas/register-schema'

const fakeApiClient = {
  login: async (credentials: LoginSchema) => {
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        const users = localStorage.getItem('users')

        if (!users) {
          localStorage.setItem('users', JSON.stringify([]))

          return reject('No user with this username. Please register yourself!')
        }

        const usersArray: UserDTO[] = JSON.parse(users)

        const user = usersArray.find((item) => item.email === credentials.email)

        if (!user) {
          return reject('No user with this username found.')
        }

        if (user.password !== credentials.password) {
          return reject('Wrong password')
        }

        const { password: _, ...userWithoutPassword } = user

        resolve(userWithoutPassword)
      }, 1000)
    })
  },
  register: async (user: RegisterSchema) => {
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        const users = localStorage.getItem('users') || '[]'

        const usersArray: UserDTO[] = JSON.parse(users)

        if (usersArray.find((item) => item.username === user.username)) {
          return reject('User already exists')
        }

        const newUser: UserDTO = {
          id: usersArray.length + 1,
          ...user,
        }

        usersArray.push(newUser)

        localStorage.setItem('users', JSON.stringify(usersArray))

        const { password: _, ...userWithoutPassword } = newUser

        resolve(userWithoutPassword)
      }, 1000)
    })
  },
}

export default fakeApiClient
