import Button from '@components/ui/button'
import { User } from '@models/user-type'
import { FC } from 'react'

import './welcome-user.css'

type WelcomeUserProps = {
  user: User
  onLogout: () => void
}

const WelcomeUser: FC<WelcomeUserProps> = ({ user, onLogout }) => {
  return (
    <div className="welcome-user drop-shadow">
      <h1>Hello, {user.username}!</h1>
      <p>Nice to see you again!</p>

      <Button variant="link" onClick={onLogout}>
        Logout
      </Button>
    </div>
  )
}

export default WelcomeUser
