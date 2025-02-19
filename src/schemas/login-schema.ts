import { z } from 'zod'
import {
  MAX_EMAIL_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '@constants/validation-constants'

const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .max(
      MAX_EMAIL_LENGTH,
      `Email must be at most ${MAX_EMAIL_LENGTH} characters`
    ),
  password: z
    .string()
    .min(
      MIN_PASSWORD_LENGTH,
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
    )
    .max(
      MAX_PASSWORD_LENGTH,
      `Password must be at most ${MAX_PASSWORD_LENGTH} characters`
    ),
})

export type LoginSchema = z.infer<typeof loginSchema>

export default loginSchema
