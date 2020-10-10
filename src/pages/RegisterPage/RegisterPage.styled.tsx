import { motion } from 'framer-motion'
import styled from 'styled-components'
import Button from '../../components/Button'
import Card from '../../components/Card'

export const Wrapper = styled(motion.div)`
  position: relative;
  height: 100%;
`

export const StyledCard = styled(Card)`
  width: 50%;
  max-width: 450px;
  min-width: 250px;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

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
