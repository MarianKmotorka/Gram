import React, { ButtonHTMLAttributes } from 'react'
import { LoadingIcon } from '../Icons'
import { LoadingProgress, StyledActionButton, StyledPrimaryButton } from './Button.styled'

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element
  primaryColor?: string
  buttonType?: ButtonType
  disabled?: boolean
  isLoading?: boolean
  reversed?: boolean
  loadingProgress?: number
  className?: string
}

type ButtonType = 'primary' | 'action'

const Button: React.FC<IProps> = ({
  children,
  isLoading,
  buttonType = 'primary',
  icon,
  disabled,
  loadingProgress,
  ...rest
}) => {
  switch (buttonType) {
    case 'action':
      return (
        <StyledActionButton {...rest} disabled={isLoading || disabled}>
          {isLoading ? <LoadingIcon progress={loadingProgress} fontSize='20px' /> : icon}
        </StyledActionButton>
      )

    default:
      return (
        <StyledPrimaryButton {...rest} disabled={isLoading || disabled}>
          {isLoading ? <LoadingIcon fontSize='20px' /> : children}
          {isLoading && loadingProgress !== undefined && (
            <LoadingProgress>{loadingProgress.toFixed()}</LoadingProgress>
          )}
        </StyledPrimaryButton>
      )
  }
}

export default Button
