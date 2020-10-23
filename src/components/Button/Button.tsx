import React, { ButtonHTMLAttributes } from 'react'
import { LoadingProgress, StyledActionButton, StyledPrimaryButton } from './Button.styled'

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconName?: string
  primaryColor?: string
  buttonType?: ButtonType
  disabled?: boolean
  isLoading?: boolean
  reversed?: boolean
  loadingProgress?: number
}

type ButtonType = 'primary' | 'action'

const Button: React.FC<IProps> = ({
  children,
  isLoading,
  buttonType = 'primary',
  iconName,
  disabled,
  loadingProgress,
  ...rest
}) => {
  switch (buttonType) {
    case 'action':
      return (
        <StyledActionButton {...rest} disabled={isLoading || disabled}>
          <i className={isLoading ? 'fas fa-circle-notch fa-spin' : iconName} />
        </StyledActionButton>
      )

    default:
      return (
        <StyledPrimaryButton {...rest} disabled={isLoading || disabled}>
          {isLoading ? <i className='fas fa-circle-notch fa-spin'></i> : children}
          {isLoading && loadingProgress !== undefined && (
            <LoadingProgress>{loadingProgress.toFixed()}</LoadingProgress>
          )}
        </StyledPrimaryButton>
      )
  }
}

export default Button
