import React from 'react'
import styled from 'styled-components'

interface IInputProps {
  value: string
  onChange: (value: string) => void
  label?: string
  width?: string
  type?: string
  className?: string
  multiLine?: boolean
  rows?: number
  disabled?: boolean
}

const Wrapper = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width || '100%'};
`

const Label = styled.label`
  margin: 0 0 3px 3px;
`

const StyledTextArea = styled.textarea`
  line-height: 30px;
  padding: 3px 10px;
  font-size: 1rem;
  width: 100%;

  border-radius: 6px;
  border: none;
  outline: none;
  box-shadow: 0 5px 14px rgba(0, 0, 0, 0.1);
`

const StyledInput = styled.input`
  line-height: 30px;
  padding: 3px 10px;
  font-size: 1rem;
  width: 100%;

  border-radius: 6px;
  border: none;
  outline: none;
  box-shadow: 0 5px 14px rgba(0, 0, 0, 0.1);
`

const Input = ({
  label,
  width,
  value,
  type,
  className,
  disabled,
  rows,
  onChange,
}: IInputProps) => {
  return (
    <Wrapper width={width} className={className}>
      {label && <Label>{label}</Label>}

      {!rows && (
        <StyledInput
          onChange={e => !disabled && onChange(e.target.value)}
          value={value}
          type={type}
        />
      )}

      {rows && (
        <StyledTextArea
          onChange={e => !disabled && onChange(e.target.value)}
          value={value}
          rows={rows}
        />
      )}
    </Wrapper>
  )
}

export default Input
