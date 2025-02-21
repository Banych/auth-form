import { UserContext } from '@providers/UserProvider'
import { useContext } from 'react'

export default () => {
  return useContext(UserContext)
}
