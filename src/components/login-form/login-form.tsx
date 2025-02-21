import Button from '@components/ui/button'
import Input from '@components/ui/input'
import PasswordInput from '@components/ui/password-input'
import { zodResolver } from '@hookform/resolvers/zod'
import loginSchema, { LoginSchema } from '@schemas/login-schema'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import './login-form.css'

type LoginFormProps = {
  onLogin: (data: LoginSchema) => Promise<void>
  isLoading: boolean
}

const LoginForm: FC<LoginFormProps> = ({ onLogin, isLoading }) => {
  const { handleSubmit, control, ...formMethods } = useForm<LoginSchema>({
    mode: 'all',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const isSubmitButtonDisabled =
    !formMethods.formState.isValid || !formMethods.formState.isDirty

  const handleSubmitForm = handleSubmit((data) => {
    onLogin(data)
  })

  return (
    <form onSubmit={handleSubmitForm} className="login-form">
      <Controller
        name="email"
        control={control}
        render={({ field: { disabled, ...field }, fieldState }) => (
          <Input
            {...field}
            disabled={disabled || isLoading}
            label="Email"
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { disabled, ...field }, fieldState }) => (
          <PasswordInput
            {...field}
            disabled={disabled || isLoading}
            label="Password"
            error={fieldState.error?.message}
          />
        )}
      />
      <Button
        type="submit"
        disabled={isSubmitButtonDisabled}
        isLoading={isLoading}
      >
        Login
      </Button>
    </form>
  )
}

export default LoginForm
