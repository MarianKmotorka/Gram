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
  margin: 0 0 3px 8px;
`

const StyledTextArea = styled.textarea`
  line-height: 30px;
  padding: 3px 10px;
  font-size: 18px;
  width: 100%;

  border: 3px solid transparent;
  border-radius: 18px;
  outline: none;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1), 2px 2px 3px rgba(0, 0, 0, 0.1) inset;
`

const StyledInput = styled.input`
  line-height: 30px;
  padding: 3px 10px;
  font-size: 18px;
  width: 100%;

  border: 3px solid transparent;
  border-radius: 18px;
  outline: none;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1), 2px 2px 3px rgba(0, 0, 0, 0.1) inset;
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
