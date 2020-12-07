import styled, { css } from 'styled-components'

const smallScreenWidth = '600px'

export const Wrapper = styled.div`
  margin-top: 25px;
`

export const Grid = styled.div<{ smallScreenGrid: boolean }>`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  margin-bottom: 15px;

  @media only screen and (max-width: ${smallScreenWidth}) {
    ${({ smallScreenGrid }) =>
      smallScreenGrid &&
      css`
        grid-gap: 8px;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      `}

    @media only screen and (max-width: 400px) {
      padding: 0 5px;
    }
  }
`

export const GridItem = styled.div<{ smallScreenGrid: boolean }>`
  height: 250px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  transition: transform 0.15s;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);

  @media only screen and (max-width: ${smallScreenWidth}) {
    ${({ smallScreenGrid }) =>
      smallScreenGrid &&
      css`
        height: 100px;
      `}
  }

  :hover rect {
    clip-path: circle(100%);
    background: rgba(0, 0, 0, 0.7);

    section {
      opacity: 1;
    }
  }
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

export const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const BottomDiv = styled.div`
  height: 1px;
`

export const LayoutControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;

  i {
    font-size: 30px;
    cursor: pointer;
  }

  > * + * {
    margin-left: 15px;
  }

  @media only screen and (min-width: ${smallScreenWidth}) {
    display: none;
  }
`

export const VerticalSeparator = styled.div`
  width: 1px;
  background-color: rgba(0, 0, 0, 0.3);
  height: 35px;
`

export const GridItemOverlay = styled.rect<{ smallScreenGrid: boolean }>`
  position: absolute;
  display: grid;
  place-items: center;
  top: 0%;
  right: 0%;
  height: 100%;
  width: 100%;
  cursor: pointer;
  transition: all 0.4s;
  color: ${({ theme }) => theme.white};
  background: rgba(0, 0, 0, 0.3);
  clip-path: circle(65px at 100% 0%);

  > i {
    position: absolute;
    cursor: inherit;
    transition: inherit;
    top: 14px;
    right: 14px;
    font-size: 1.5rem;
    color: inherit;
  }

  section {
    opacity: 0;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    color: inherit;

    i {
      font-size: 1.7rem;
      margin-right: 8px;
      color: inherit;
      cursor: inherit;
    }

    span {
      font-size: 1.4rem;
      color: inherit;
      display: flex;
      align-items: center;
    }
  }

  @media only screen and (max-width: ${smallScreenWidth}) {
    ${({ smallScreenGrid }) =>
      smallScreenGrid &&
      css`
        clip-path: circle(35px at 100% 0%);

        span,
        i,
        section > span,
        section i {
          font-size: 0.8rem;
        }

        > i {
          top: 8px;
          right: 8px;
        }
      `}
  }
`
