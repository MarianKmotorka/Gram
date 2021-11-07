import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 8px;
  height: 60px;
  position: relative;
  z-index: 1;

  .filter {
    display: flex;
    align-items: center;

    :hover ~ span {
      display: block;
    }
  }

  .allFilter:hover ~ span {
    transform: translateX(181px);
    width: 48px;
  }
  .followedFilter:hover ~ span {
    transform: translateX(249px);
    width: 90px;
  }
  .mineFilter:hover ~ span {
    transform: translateX(360px);
    width: 58px;
  }

  @media only screen and (max-width: 400px) {
    border-radius: 0px;
  }
`

export const Indicator = styled.span`
  height: 32px;
  display: none;
  background: ${({ theme }) => theme.accent};
  border-radius: 10px;
  position: absolute;
  z-index: -1;
  left: 0;
  top: 14px;
  opacity: 0.6;
  transition: transform 0.25s, width 0.25s;
`
