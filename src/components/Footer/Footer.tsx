import React from 'react'
import { Centered, GithubLink, Wrapper } from './Footer.styled'

const Footer = () => {
  const commonProps = {
    drag: true,
    dragConstraints: { top: 0, bottom: 0, left: 0, right: 0 },
  }

  return (
    <Wrapper>
      <Centered>
        <GithubLink
          {...commonProps}
          href='https://github.com/MarianKmotorka/Gram'
          target='_blank'
        >
          <i className='fab fa-github'></i>
        </GithubLink>
      </Centered>
    </Wrapper>
  )
}

export default Footer
