import styled from 'styled-components'
import { motion } from 'framer-motion'
import Button from '../../components/Button/Button'
import Card from '../../components/Card'

export const Wrapper = styled(motion.div)`
  position: relative;
  min-height: 100%;
  display: grid;
  place-items: center;
`

export const StyledCard = styled(Card)`
  width: 100%;
  max-width: 600px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  > * + * {
    margin-top: 20px;
  }

  @media only screen and (max-width: 600px) {
    box-shadow: none;
  }
`

export const StyledButton = styled(Button)`
  margin-left: auto;
`

export const Title = styled.h2`
  color: ${({ theme }) => theme.red};
  margin-right: auto;
`
