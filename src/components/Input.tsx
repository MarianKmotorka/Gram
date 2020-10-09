import React, { InputHTMLAttributes } from "react"
import styled from "styled-components"

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  width?: string
}

const Wrapper = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width || "300px"};
`

const Label = styled.label`
  margin: 0 0 5px 8px;
`

const StyledInput = styled.input`
  line-height: 30px;
  padding: 3px 10px;
  font-size: 18px;

  border: 3px solid transparent;
  border-radius: 18px;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`

const Input = ({ label, width, ...rest }: IProps) => {
  return (
    <Wrapper width={width}>
      {label && <Label>{label}</Label>}
      <StyledInput {...rest} />
    </Wrapper>
  )
}

export default Input
