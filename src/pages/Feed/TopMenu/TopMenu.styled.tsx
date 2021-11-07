import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 8px;
  @media only screen and (max-width: 400px) {
    border-radius: 0px;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.bg2};
  height: 60px;
  position: relative;
  z-index: 1;

  > div {
    display: flex;
    align-items: center;
  }
`

interface IndicatorProps {
  offset: number
  width: number
  isHidden: 0 | 1
}

export const Indicator = styled.span<IndicatorProps>`
  height: 32px;
  width: 70px;
  display: block;
  background: ${({ theme }) => theme.accent};
  border-radius: 10px;
  position: absolute;
  z-index: -1;

  left: 0;
  top: 14px;
  opacity: 0.6;
  display: ${({ isHidden }) => (isHidden ? 'none' : 'block')};
  transition: transform 0.25s, width 0.25s;
  transform: ${({ offset }) => `translateX(${offset}px)`};
  width: ${({ width }) => `${width}px`};
`
