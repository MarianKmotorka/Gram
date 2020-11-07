import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.white};
  border-radius: 30px;
  overflow: hidden;
`

export const Header = styled.div`
  padding: 20px;
`

export const Title = styled.h3`
  padding: 20px 0 0 0;
`

export const AuthorSection = styled.section`
  display: flex;
  align-items: center;

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

export const Body = styled.div`
  img {
    width: 100%;
  }
`

export const Description = styled(motion.p)`
  background: ${({ theme }) => theme.grayBlue};
  padding: 20px;

  color: ${({ theme }) => theme.white};
  font-weight: lighter;
`

export const ShowMore = styled.p`
  text-decoration: underline;
  margin-left: 20px;

  cursor: pointer;
  :hover {
    font-weight: 400;
  }

  ::after {
    content: ' ->';
  }
`

export const ActionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    margin: 5px 10px 10px;
    width: 100px;

    box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.1);
    color: ${({ theme }) => theme.grayBlue};

    :hover {
      box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.1) inset;
      background: ${({ theme }) => theme.greenLight};
      color: ${({ theme }) => theme.grayBlue};
    }

    i,
    span,
    :hover i,
    :hover span {
      color: inherit;
    }

    span {
      font-size: smaller;
      margin-left: 5px;
    }
  }
`
