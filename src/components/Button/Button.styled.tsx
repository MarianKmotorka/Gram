import styled from 'styled-components'
import { lightenColor } from '../../utils/utils'

export const StyledPrimaryButton = styled.button<{ bg?: string }>`
  outline: none;
  border-radius: 18px;
  border: 1px solid ${({ theme, bg }) => (bg ? theme[bg] : theme.white)};

  font-size: 18px;
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
  transition: background-color 0.2s, color 0.2s;

  padding: 8px 20px;
  background: ${({ theme, bg }) => (bg ? theme[bg] : theme.red)};
  color: ${({ theme }) => theme.white};

  :hover {
    color: ${({ theme, bg }) => (bg ? theme[bg] : theme.red)};
    background: ${({ theme }) => theme.white};
    * {
      color: ${({ theme, bg }) => (bg ? theme[bg] : theme.red)};
    }
  }

  * {
    color: ${({ theme }) => theme.white};
  }
`

export const StyledActionButton = styled.button<{ color?: string; disabled?: boolean }>`
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
    ${({ color, theme }) => color && `color:${theme[color]}`}
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
