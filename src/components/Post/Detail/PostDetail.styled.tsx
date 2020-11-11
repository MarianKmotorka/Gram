import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.black};
  display: flex;
`

export const ImageContainer = styled.div`
  height: 100%;
  flex: 7;

  display: flex;
  justify-content: center;
  position: relative;
  }
`

export const BlurredBackground = styled.img`
  filter: blur(10px) brightness(40%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  z-index: 2;
`

export const DetailContainer = styled.div`
  height: 100%;
  flex: 3;
  min-width: 340px;
  background-color: ${({ theme }) => theme.bg};
  z-index: 3;
`

export const Btn = styled.div<{
  visibility: string
  top?: string
  left?: string
  right?: string
}>`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  visibility: ${({ visibility }) => visibility};

  display: grid;
  place-items: center;
  z-index: 4;
  height: 45px;
  width: 45px;
  cursor: pointer;

  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  transition: background-color 0.2s;

  i {
    color: ${({ theme }) => theme.bg};
    font-size: 1.1rem;
  }

  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`
