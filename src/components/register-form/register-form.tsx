import { FC, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import registerSchema, { RegisterSchema } from '@schemas/register-schema'
import Input from '@components/ui/input'
import Button from '@components/ui/button'
import PasswordInput from '@components/ui/password-input/password-input'

import './register-form.css'

type RegisterFormProps = {
  onRegister: (data: RegisterSchema) => Promise<void>
  isLoading: boolean
}

const RegisterForm: FC<RegisterFormProps> = ({ onRegister, isLoading }) => {
  const { handleSubmit, control, ...formMethods } = useForm<RegisterSchema>({
    mode: 'onTouched',
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const isSubmitDisabled = useMemo(() => {
    return formMethods.formState.isSubmitted && !formMethods.formState.isValid
  }, [formMethods.formState])

  const handleSubmitForm = handleSubmit((data) => {
    onRegister(data)
  })

  return (
    <form onSubmit={handleSubmitForm} className="register-form">
      <Controller
        name="username"
        control={control}
        render={({ field: { disabled, ...field }, fieldState }) => (
          <Input
            {...field}
            disabled={disabled || isLoading}
            label="User name"
            error={fieldState.error?.message}
          />
        )}
      />
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
      <Controller
        name="passwordConfirmation"
        control={control}
        render={({ field: { disabled, ...field }, fieldState }) => (
          <PasswordInput
            {...field}
            disabled={disabled || isLoading}
            label="Password confirmation"
            error={fieldState.error?.message}
          />
        )}
      />
      <Button type="submit" disabled={isSubmitDisabled} isLoading={isLoading}>
        Register
      </Button>
    </form>
  )
}

export default RegisterForm
