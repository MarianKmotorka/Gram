import React from 'react'
import styled from 'styled-components'

type textType = 'info' | 'error'

interface IProps {
  textType?: textType
  text: string
}

const Wrapper = styled.div<{ color: string; bg: string }>`
  margin: 10px 0;
  padding: 10px 20px;
  background: ${({ theme, bg }) => theme[bg]};
  border-radius: 7px;
  width: 100%;
  color: ${({ theme, color }) => theme[color]};

  i {
    color: inherit;
    margin-right: 5px;
  }
`

const MessageStripe: React.FC<IProps> = ({ textType = 'info', text }) => {
  let bg = 'bg2'
  let color = 'black'
  let icon = 'fas fa-info-circle'

  if (textType === 'error') {
    bg = 'accent'
    color = 'bg'
    icon = 'fas fa-exclamation-circle'
  }

  return (
    <Wrapper bg={bg} color={color}>
      <i className={icon}></i>
      {text}
    </Wrapper>
  )
}

export default MessageStripe
