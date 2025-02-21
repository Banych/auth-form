import { z } from 'zod'
import {
  MAX_EMAIL_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
} from '@constants/validation-constants'

const registerSchema = z
  .object({
    email: z
      .string()
      .email('Invalid email address')
      .max(
        MAX_EMAIL_LENGTH,
        `Email must be at most ${MAX_EMAIL_LENGTH} characters`
      ),
    username: z
      .string()
      .min(
        MIN_USERNAME_LENGTH,
        `Username must be at least ${MIN_USERNAME_LENGTH} characters`
      ),
    password: z
      .string()
      .min(
        MIN_PASSWORD_LENGTH,
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
      )
      .max(
        MAX_PASSWORD_LENGTH,
        `Username must be at most ${MAX_PASSWORD_LENGTH} characters`
      ),
    passwordConfirmation: z
      .string()
      .min(6)
      .min(
        MIN_PASSWORD_LENGTH,
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
      )
      .max(
        MAX_PASSWORD_LENGTH,
        `Username must be at most ${MAX_PASSWORD_LENGTH} characters`
      ),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  })

export type RegisterSchema = z.infer<typeof registerSchema>

export default registerSchema
