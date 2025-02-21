import { forwardRef, InputHTMLAttributes } from 'react'

import cn from '@utils/cn'

import './input.css'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  orientation?: 'horizontal' | 'vertical'
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  startAdornmentClassName?: string
  endAdornmentClassName?: string
  inputWrapperClassName?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      orientation = 'vertical',
      startAdornment,
      endAdornment,
      startAdornmentClassName,
      endAdornmentClassName,
      inputWrapperClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn('input', `input--${orientation}`, inputWrapperClassName)}
      >
        {label && <label htmlFor={props.id}>{label}</label>}
        <div className="input-wrapper">
          {startAdornment && (
            <div
              className={cn(
                'input-adornment input-adornment--start',
                startAdornmentClassName
              )}
            >
              {startAdornment}
            </div>
          )}
          <input ref={ref} {...props} />
          {endAdornment && (
            <div
              className={cn(
                'input-adornment input-adornment--end',
                endAdornmentClassName
              )}
            >
              {endAdornment}
            </div>
          )}
        </div>
        {error && <span className="error">{error}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
