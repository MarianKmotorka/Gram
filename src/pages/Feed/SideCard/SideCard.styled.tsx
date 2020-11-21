import styled from 'styled-components'

export const Wrapper = styled.div<{ visibility?: string }>`
  background-color: ${({ theme }) => theme.bg2};
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
  height: 370px;
  min-width: 250px;
  width: 300px;
  overflow: hidden;

  position: sticky;
  top: 25px;

  border-radius: 15px;
  visibility: ${({ visibility }) => visibility || 'auto'};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 1200px) {
    display: none;
  }
`

export const ProfilePhoto = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  top: -50px;
  border: 3px solid ${({ theme }) => theme.white};
  cursor: pointer;
`

export const CardTop = styled.div`
  height: 75px;
  width: 100%;
  background-color: ${({ theme }) => theme.primary};
`

export const CardMiddle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 25px;
`

export const Nick = styled.h3`
  color: white;
  ::first-letter {
    color: ${({ theme }) => theme.accent2};
  }

  font-size: 1.6em;
  font-weight: 500;
  margin-top: -35px;
`

export const CardSeparator = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);

  margin-bottom: 30px;
`

export const Stat = styled.p`
  font-weight: 200;
  color: ${({ theme }) => theme.white};
  b {
    font-weight: 500;
    margin-right: 10px;
    color: ${({ theme }) => theme.accent};
  }
  i {
    color: ${({ theme }) => theme.accent};
    width: 30px;
    text-align: center;
  }

  margin: 8px auto 0 30px;
`
