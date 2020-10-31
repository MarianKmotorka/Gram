import React from 'react'
import { Centered, Copyright, GithubLink, Logo, Wrapper } from './Footer.styled'

const Footer = () => {
  const commonProps = {
    drag: true,
    dragConstraints: { top: 0, bottom: 0, left: 0, right: 0 },
  }

  return (
    <Wrapper>
      <Centered>
        <Logo {...commonProps}>@GRAM</Logo>

        <GithubLink
          {...commonProps}
          href='https://github.com/MarianKmotorka/Gram'
          target='_blank'
        >
          <i className='fab fa-github'></i>
        </GithubLink>

        <Copyright {...commonProps}>©gram 2020</Copyright>
      </Centered>
    </Wrapper>
  )
}

export default Footer
