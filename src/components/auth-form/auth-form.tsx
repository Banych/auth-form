import { useCallback, useState } from 'react'

import './auth-form.css'
import Button from '@components/ui/button'
import ToggleButton from '@components/ui/toggle-button'
import Input from '@components/ui/input'
import RegisterForm from '@components/register-form/register-form'

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false)

  const handleToggleFormType = useCallback((isRegister: boolean) => {
    setIsRegister(isRegister)
  }, [])

  return (
    <div className="auth-form">
      <h1>{isRegister ? 'Register' : 'Login'}</h1>
      {isRegister ? <RegisterForm /> : 'Login form'}
      <ToggleButton
        offLabel="Login"
        onLabel="Register"
        onToggle={handleToggleFormType}
        isToggled={isRegister}
      />
    </div>
  )
}

export default AuthForm
