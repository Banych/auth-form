import { useCallback, useState } from 'react'

import useUserContext from '@hooks/use-user-context'
import { RegisterSchema } from '@schemas/register-schema'
import { LoginSchema } from '@schemas/login-schema'
import ToggleButton from '@components/ui/toggle-button'
import RegisterForm from '@components/register-form'
import LoginForm from '@components/login-form'

import './auth-form.css'

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false)

  const { isLoading: isAuthLoading, login, register } = useUserContext()

  const handleToggleFormType = useCallback((isRegister: boolean) => {
    setIsRegister(isRegister)
  }, [])

  const handleRegister = useCallback(
    async (data: RegisterSchema) => {
      await register(data)
    },
    [register]
  )

  const handleLogin = useCallback(
    async (data: LoginSchema) => {
      await login(data)
    },
    [login]
  )

  return (
    <div className="auth-form drop-shadow">
      <div className="auth-form__header">
        <h2>Welcome to our AuthFormApp</h2>
        <p>Please {isRegister ? 'register' : 'login'} to continue</p>
      </div>
      <div className="auth-form__content">
        <ToggleButton
          offLabel="Login"
          onLabel="Register"
          onToggle={handleToggleFormType}
          isToggled={isRegister}
          aria-label="Toggle between login and register"
        />
        {isRegister ? (
          <RegisterForm onRegister={handleRegister} isLoading={isAuthLoading} />
        ) : (
          <LoginForm onLogin={handleLogin} isLoading={isAuthLoading} />
        )}
      </div>
    </div>
  )
}

export default AuthForm
