import Button from '@components/ui/button'
import Input from '@components/ui/input'
import cn from '@utils/cn'
import { Eye, EyeClosed } from 'lucide-react'
import {
  ComponentPropsWithoutRef,
  ComponentRef,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from 'react'

import './password-input.css'

type PasswordInputProps = ComponentPropsWithoutRef<typeof Input> & {}

const PasswordInput = forwardRef<
  ComponentRef<typeof Input>,
  PasswordInputProps
>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClick = useCallback(() => {
    setShowPassword((prev) => !prev)
  }, [])

  const EyeAdornment = useMemo(() => {
    return showPassword ? (
      <EyeClosed size={24} className="input-adornment--icon" />
    ) : (
      <Eye size={24} className="input-adornment--icon" />
    )
  }, [showPassword])

  return (
    <Input
      {...props}
      inputWrapperClassName={cn(className, 'password-input')}
      ref={ref}
      type={showPassword ? 'text' : 'password'}
      endAdornment={
        <Button
          type="button"
          variant="icon"
          onClick={handleClick}
          className="input-adornment--button"
        >
          {EyeAdornment}
        </Button>
      }
      endAdornmentClassName={
        showPassword ? 'input-adornment--icon--active' : ''
      }
    />
  )
})

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
