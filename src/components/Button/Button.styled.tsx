import styled, { css } from 'styled-components'
import { lightenColor } from '../../utils/utils'

interface IProps {
  primaryColor?: string
  reversed?: boolean
}

export const StyledPrimaryButton = styled.button<IProps>`
  ${({ primaryColor = 'redLight', reversed, disabled, theme }) => {
    const color1 = reversed ? theme[primaryColor] : theme.white
    const color2 = reversed ? theme.white : theme[primaryColor]

    return css`
      outline: none;
      border-radius: 18px;
      border: 1px solid ${theme[primaryColor]};

      font-size: 18px;
      cursor: ${disabled ? 'auto' : 'pointer'};
      transition: background-color 0.2s, color 0.2s;

      padding: 8px 20px;
      background: ${color1};
      color: ${color2};

      :hover {
        color: ${color1};
        background: ${color2};
        * {
          color: ${color1};
        }
      }

      * {
        color: ${color2};
      }
    `
  }}
`

export const StyledActionButton = styled.button<IProps>`
  font-size: 20px;
  margin-left: 7px;
  width: 50px;
  height: 50px;
  background: transparent;
  border: none;
  outline: none;
  border-radius: 50%;
  transition: background-color 0.3s;
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};

  i {
    ${({ primaryColor, theme }) => primaryColor && `color:${theme[primaryColor]}`}
  }

  :hover {
    background: ${({ theme }) => lightenColor(theme.green, 0.3)};
  }
`

export const LoadingProgress = styled.span`
  margin-left: 7px;

  ::after {
    content: '%';
  }
`
