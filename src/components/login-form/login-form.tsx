import { FC, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import loginSchema, { LoginSchema } from '@schemas/login-schema'
import Button from '@components/ui/button'
import Input from '@components/ui/input'
import PasswordInput from '@components/ui/password-input'

import './login-form.css'

type LoginFormProps = {
  onLogin: (data: LoginSchema) => Promise<void>
  isLoading: boolean
}

const LoginForm: FC<LoginFormProps> = ({ onLogin, isLoading }) => {
  const { handleSubmit, control, ...formMethods } = useForm<LoginSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    reValidateMode: 'onChange',
  })

  const isSubmitButtonDisabled = useMemo(() => {
    return formMethods.formState.isSubmitted && !formMethods.formState.isValid
  }, [formMethods.formState])

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
            id="email"
            disabled={disabled || isLoading}
            label="Email"
            error={fieldState.error?.message}
            aria-invalid={!!fieldState.error}
            aria-describedby={fieldState.error ? 'email-error' : undefined}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { disabled, ...field }, fieldState }) => (
          <PasswordInput
            {...field}
            id="password"
            disabled={disabled || isLoading}
            label="Password"
            error={fieldState.error?.message}
            aria-invalid={!!fieldState.error}
            aria-describedby={fieldState.error ? 'password-error' : undefined}
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
