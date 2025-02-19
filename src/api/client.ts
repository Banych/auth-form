import { User, UserDTO } from '@models/user-type'
import { RegisterSchema } from '@schemas/register-schema'

const fakeApiClient = {
  login: async (username: string, password: string) => {
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        const users = localStorage.getItem('users')

        if (!users) {
          localStorage.setItem('users', JSON.stringify([]))

          return reject('No user with this username')
        }

        const usersArray: UserDTO[] = JSON.parse(users)

        const user = usersArray.find((user) => user.username === username)

        if (!user) {
          return reject('No user with this username')
        }

        if (user.password !== password) {
          return reject('Wrong password')
        }

        const { password: _, ...userWithoutPassword } = user

        resolve(userWithoutPassword)
      }, 1000)
    })
  },
  register: async (user: RegisterSchema) => {
    return new Promise((resolve, reject) => {
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
