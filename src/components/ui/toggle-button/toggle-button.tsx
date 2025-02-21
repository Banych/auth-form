import { ReactNode, useCallback, useState } from 'react'

import cn from '@utils/cn'
import Button from '@components/ui/button/button'

import './toggle-button.css'

type ToggleButtonProps = {
  isToggled?: boolean
  onToggle?: (toggled: boolean) => void
  offLabel?: ReactNode
  onLabel?: ReactNode
  disabled?: boolean
}

const ToggleButton = ({
  isToggled: controlledToggled,
  onToggle,
  offLabel = 'Off',
  onLabel = 'On',
  disabled,
}: ToggleButtonProps) => {
  const [internalToggled, setInternalToggled] = useState(false)
  const isControlled = controlledToggled !== undefined
  const isToggled = isControlled ? controlledToggled : internalToggled

  const handleToggle = useCallback(() => {
    if (!isControlled) {
      setInternalToggled((prev) => !prev)
    }
    if (onToggle) {
      onToggle(!isToggled)
    }
  }, [isControlled, isToggled, onToggle])

  return (
    <Button
      className={cn('toggle-button', isToggled && 'toggled')}
      disabled={disabled}
      onClick={handleToggle}
    >
      <span className="toggle-option">{offLabel}</span>
      <span className={cn('toggle-indicator', isToggled && 'toggled')}></span>
      <span className="toggle-option">{onLabel}</span>
    </Button>
  )
}

export default ToggleButton
