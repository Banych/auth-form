import useUserContext from '@hooks/use-user-context'
import './App.css'
import AuthForm from '@components/auth-form'
import WelcomeUser from '@components/welcome-user'

function App() {
  const { user, logout } = useUserContext()

  return (
    <main className="container">
      {user ? <WelcomeUser user={user} onLogout={logout} /> : <AuthForm />}
    </main>
  )
}

export default App
