import styled from 'styled-components'
import Button from '../../components/Button/Button'
import Card from '../../components/Card'

export const Wrapper = styled.div`
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
  border-radius: 30px;
  background: ${({ theme }) => theme.white};
  box-shadow: -6px -6px 10px rgba(255, 255, 255, 0.5), 6px 6px 10px rgba(0, 0, 0, 0.1);

  label {
    color: ${({ theme }) => theme.primary};
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
  color: ${({ theme }) => theme.accent};
  margin-right: auto;
`
