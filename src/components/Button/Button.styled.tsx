import styled, { css } from 'styled-components'
import { lightenColor } from '../../utils'

export interface IStyledButtonProps {
  bg?: string
  color?: string
  hover?: boolean
  reversed?: boolean
  scale?: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  position?: string
}

export const StyledPrimaryButton = styled.button<IStyledButtonProps>`
  position: ${({ top, left, bottom, right, position }) =>
    position ? position : top || left || bottom || right ? 'absolute' : 'static'};

  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};

  ${({
    bg = 'primary',
    color = 'white',
    hover = true,
    scale = 1,
    reversed,
    disabled,
    theme,
  }) => {
    const colorHex = reversed ? theme[bg] : theme[color]
    const bgHex = reversed ? theme[color] : theme[bg]

    return css`
      outline: none;
      border: none;
      border-radius: 6px;

      font-size: 1rem;
      cursor: ${disabled ? 'auto' : 'pointer'};
      transform: scale(${scale});
      transition: background-color 0.2s, color 0.2s;

      padding: 8px 18px;
      background: ${bgHex};
      color: ${colorHex};

      ${hover &&
      css`
        :hover {
          color: ${bgHex};
          background: ${colorHex};
          * {
            color: inherit;
          }
        }
      `}

      * {
        color: inherit;
      }
    `
  }}

  i {
    cursor: inherit;
  }
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

  i {
    cursor: inherit;
  }
`

export const LoadingProgress = styled.span`
  margin-left: 7px;

  ::after {
    content: '%';
  }
`
