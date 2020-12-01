import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: ${({ theme }) => theme.black};
`

export const MediaContainer = styled.div`
  height: 100%;
  flex: 7;

  display: flex;
  justify-content: center;
  position: relative;
`

export const BlurredImageBackground = styled.img`
  filter: blur(10px) brightness(40%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const BlurredVideoBackground = styled.video`
  filter: blur(15px) brightness(40%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  z-index: 2;
`

export const Video = styled.video`
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  z-index: 2;

  :focus,
  :active {
    outline: none;
  }
`

export const DetailContainer = styled.div`
  height: 100%;
  flex: 3;
  min-width: 340px;
  background-color: ${({ theme }) => theme.bg2};
  z-index: 3;

  @media only screen and (max-width: 600px) {
    min-width: 100%;
  }
`

export const BottomButtonsContainer = styled.div<{ bottom: string }>`
  position: absolute;
  bottom: ${({ bottom }) => bottom};
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 4;
  overflow: hidden;
  border-radius: 100vh;
`

export const BottomButton = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  font-size: 1.3rem;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  :hover {
    background-color: rgba(100, 100, 100, 0.5);
  }

  span {
    font-size: 1rem;
    color: ${({ theme }) => theme.bg};
    margin-left: 6px;
  }

  i {
    cursor: inherit;
  }
`
