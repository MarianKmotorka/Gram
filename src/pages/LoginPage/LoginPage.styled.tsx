import styled from 'styled-components'
import { motion } from 'framer-motion'
import Button from '../../components/Button'
import Card from '../../components/Card'

export const Wrapper = styled(motion.div)`
  position: relative;
  height: 100%;
  display: grid;
  place-items: center;
`

export const StyledCard = styled(Card)`
  width: 50%;
  max-width: 450px;
  min-width: 250px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  > * + * {
    margin-top: 20px;
  }
`

export const StyledButton = styled(Button)`
  margin-left: auto;
`

export const Title = styled.h2`
  color: ${({ theme }) => theme.red};
  margin-right: auto;
`
