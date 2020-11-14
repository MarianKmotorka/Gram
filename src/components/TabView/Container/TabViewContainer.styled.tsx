import styled, { css } from 'styled-components'

export const TAB_BAR_HEIGHT = 50
export const TAB_BAR_HEIGHT_PX = `${TAB_BAR_HEIGHT}px`

export const Wrapper = styled.div`
  width: 100%;
`

export const TabsWrapper = styled.div`
  height: ${TAB_BAR_HEIGHT_PX};
  width: 100%;
  display: flex;
`

export const Tab = styled.div<{ active: boolean }>`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;

  ${({ active }) =>
    active
      ? css`
          background: ${({ theme }) => theme.bg};
          color: ${({ theme }) => theme.primary};
          font-size: 0.9rem;
        `
      : css`
          background: ${({ theme }) => theme.primary};
          color: ${({ theme }) => theme.white};
          font-size: 0.9rem;

          :hover {
          }
        `}
`
