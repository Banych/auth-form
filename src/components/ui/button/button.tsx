import { ButtonHTMLAttributes, forwardRef } from 'react'
import { Loader } from 'lucide-react'
import './button.css'
import cn from '@utils/cn'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
  variant?: 'primary' | 'secondary' | 'outlined' | 'link' | 'icon'
  size?: 'small' | 'medium' | 'large'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      isLoading,
      children,
      className,
      variant = 'primary',
      size = 'medium',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        {...props}
        disabled={isLoading || disabled}
        className={cn(
          'button',
          `button--${variant}`,
          `button--${size}`,
          className
        )}
      >
        {isLoading ? (
          <div className="button-content__loading">
            <Loader className="spinner" />
            {children}
          </div>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
