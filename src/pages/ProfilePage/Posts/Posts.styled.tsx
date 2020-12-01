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

export const Image = styled.img<{ smallScreenGrid: boolean }>`
  height: 250px;
  width: 100%;
  object-fit: cover;
  cursor: pointer;
  border-radius: 10px;
  transition: transform 0.15s;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);

  :hover {
    transform: scale(0.95);
  }

  @media only screen and (max-width: ${smallScreenWidth}) {
    ${({ smallScreenGrid }) =>
      smallScreenGrid &&
      css`
        height: 100px;
      `}
  }
`

export const Video = styled.video<{ smallScreenGrid: boolean }>`
  height: 250px;
  width: 100%;
  object-fit: cover;
  cursor: pointer;
  border-radius: 10px;
  transition: transform 0.15s;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);

  :hover {
    transform: scale(0.95);
  }

  @media only screen and (max-width: ${smallScreenWidth}) {
    ${({ smallScreenGrid }) =>
      smallScreenGrid &&
      css`
        height: 100px;
      `}
  }
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
