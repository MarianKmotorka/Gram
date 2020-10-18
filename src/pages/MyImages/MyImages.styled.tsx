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
  margin-bottom: 15px;
`

export const Image = styled(motion.img)`
  height: 250px;
  width: 100%;
  object-fit: cover;
  cursor: pointer;
`
