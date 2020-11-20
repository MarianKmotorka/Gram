import styled, { css } from 'styled-components'
import { lightenColor } from '../../utils/utils'

export interface IStyledButtonProps {
  bg?: string
  color?: string
  reversed?: boolean
}

export const StyledPrimaryButton = styled.button<IStyledButtonProps>`
  ${({ bg = 'primary', color = 'white', reversed, disabled, theme }) => {
    const colorHex = reversed ? theme[bg] : theme[color]
    const bgHex = reversed ? theme[color] : theme[bg]

    return css`
      outline: none;
      border: none;
      border-radius: 6px;

      font-size: 1rem;
      cursor: ${disabled ? 'auto' : 'pointer'};
      transition: background-color 0.2s, color 0.2s;

      padding: 8px 18px;
      background: ${bgHex};
      color: ${colorHex};

      :hover {
        color: ${bgHex};
        background: ${colorHex};
        * {
          color: inherit;
        }
      }

      * {
        color: inherit;
      }
    `
  }}
`

export const StyledActionButton = styled.button<IStyledButtonProps>`
  font-size: 20px;
  width: 50px;
  height: 50px;
  background: transparent;
  border: none;
  outline: none;
  border-radius: 50%;
  transition: background-color 0.3s;
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};

  i {
    ${({ bg: primaryColor, theme }) => primaryColor && `color:${theme[primaryColor]}`}
    cursor:inherit;
  }

  :hover {
    background: ${({ theme }) => lightenColor(theme.bg2, 0.3)};
  }
`

export const LoadingProgress = styled.span`
  margin-left: 7px;

  ::after {
    content: '%';
  }
`
