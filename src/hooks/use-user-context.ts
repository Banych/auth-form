import { useContext } from 'react'

import { UserContext } from '@providers/UserProvider'

export default () => {
  return useContext(UserContext)
}
