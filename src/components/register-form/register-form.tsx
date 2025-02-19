import { useForm } from 'react-hook-form'
import './register-form.css'
import registerSchema, { RegisterSchema } from '@schemas/register-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import Input from '@components/ui/input'
import Button from '@components/ui/button'

const RegisterForm = () => {
  const { handleSubmit, ...formMethods } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  })

  const handleSubmitForm = useCallback(
    handleSubmit((data) => {
      console.log(data)
    }),
    [handleSubmit]
  )
  return (
    <form onSubmit={handleSubmitForm}>
      <Input {...formMethods.register('username')} />
      <Input {...formMethods.register('email')} />
      <Input {...formMethods.register('password')} />
      <Input {...formMethods.register('passwordConfirmation')} />
      <Button type="submit">Register</Button>
    </form>
  )
}

export default RegisterForm
