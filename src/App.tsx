import useUserContext from '@hooks/use-user-context'
import AuthForm from '@components/auth-form'
import WelcomeUser from '@components/welcome-user'

import './App.css'

function App() {
  const { user, logout } = useUserContext()

  return (
    <main className="container">
      {user ? <WelcomeUser user={user} onLogout={logout} /> : <AuthForm />}
    </main>
  )
}

export default App
