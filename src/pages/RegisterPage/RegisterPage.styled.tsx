import styled from "styled-components"
import Button from "../../components/Button"
import Card from "../../components/Card"

export const StyledCard = styled(Card)`
  width: 50%;
  max-width: 450px;
  min-width: 250px;
  margin: 200px auto 0;
  padding: 30px;

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
  color: ${({ theme }) => theme.black};
  margin-right: auto;
`
