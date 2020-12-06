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

export const GridItemOverlay = styled.section<{ smallScreenGrid: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s;

  i {
    position: absolute;
    cursor: inherit;
    transition: inherit;
    top: 5%;
    right: 5%;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.white};

    @media only screen and (max-width: ${smallScreenWidth}) {
      ${({ smallScreenGrid }) =>
        smallScreenGrid &&
        css`
          font-size: 1rem;
        `}
    }
  }

  :hover {
    background: rgba(0, 0, 0, 0.7);

    i {
      top: 50%;
      right: 50%;
      transform: translate(50%, -50%) scale(2.7);
    }
  }
`
