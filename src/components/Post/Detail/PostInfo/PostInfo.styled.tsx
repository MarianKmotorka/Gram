import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  max-height: 100vh;
  padding: 15px 20px;

  display: flex;
  flex-direction: column;
`

export const AuthorSection = styled.section`
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding-bottom: 20px;

  img {
    border-radius: 50%;
    width: 45px;
    height: 45px;
    margin-right: 7px;
    object-fit: cover;
    border: solid 2px ${({ theme }) => theme.green};
  }
`
export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 0.8em;
    i {
      margin-right: 5px;
    }
  }
`

export const AuthorName = styled(Link)`
  font-weight: bolder;
  font-size: 1.1em;

  :first-letter {
    color: ${({ theme }) => theme.green};
  }
`

export const Title = styled.h2`
  margin: 20px 0 10px;
  font-weight: 500;
`

export const Text = styled.p`
  font-weight: 300;
  overflow-y: auto;
`
