import styled from 'styled-components'
import Button from '../../components/Button/Button'
import Card from '../../components/Card'
import pattern from '../../images/patternpad.svg'

export const Wrapper = styled.div`
  position: relative;
  min-height: 100%;
  padding: 40px 0;
  display: grid;
  place-items: center;
  background-image: url(${pattern});
`

export const StyledCard = styled(Card)`
  width: 100%;
  max-width: 600px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background: ${({ theme }) => theme.white};
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1), 2px 2px 3px rgba(0, 0, 0, 0.1) inset,
    5px 5px 50px rgba(0, 0, 0, 0.1);

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
  color: ${({ theme }) => theme.primary};
  margin-right: auto;
`
