import React from "react"
import styled from "styled-components"

type textType = "info" | "error"

interface IProps {
  textType?: textType
  text: string
}

const Wrapper = styled.div<{ color: string; bg: string }>`
  padding: 10px 20px;
  background: ${({ theme, bg }) => theme[bg]};
  border-radius: 10px;
  width: 100%;

  i {
    color: ${({ theme, color }) => theme[color]};
    margin-right: 5px;
  }
`

const MessageStripe: React.FC<IProps> = ({ textType = "info", text }) => {
  let bg = "lightBlue"
  let color = "black"
  let icon = "fas fa-info-circle"

  if (textType === "error") {
    bg = "lightPink"
    color = "red"
    icon = "fas fa-exclamation-circle"
  }

  return (
    <Wrapper bg={bg} color={color}>
      <i className={icon}></i>
      {text}
    </Wrapper>
  )
}

export default MessageStripe
