import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 100%;
  position: relative;
  padding-top: 15px;
`

export const Grid = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`

export const Image = styled(motion.img)`
  height: 250px;
  width: 100%;
  object-fit: cover;
  cursor: pointer;
`

export const UploadFileBtn = styled.span`
  background-color: ${({ theme }) => theme.red};
  height: 35px;
  width: 35px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    transition: color 0.2s;
    color: ${({ theme }) => theme.white};
  }

  :hover i {
    color: ${({ theme }) => theme.lightPink};
  }
`

export const FileInput = styled.input`
  display: none;
`
