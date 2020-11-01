import { motion } from 'framer-motion'
import styled from 'styled-components'
import Button from '../../components/Button/Button'
import Card from '../../components/Card'

export const Wrapper = styled(motion.div)`
  position: relative;
  min-height: 100%;
  padding: 40px 0;
  display: grid;
  place-items: center;
`

export const StyledCard = styled(Card)`
  width: 100%;
  max-width: 600px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background: ${({ theme }) => theme.blueGreenGradient};

  label {
    color: ${({ theme }) => theme.white};
  }

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
  color: ${({ theme }) => theme.redLight};
  margin-right: auto;
`
