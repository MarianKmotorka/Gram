import React, { FC } from 'react'

import { Button } from '../../../components'
import { FeedFilter } from '../utils'

import { Wrapper } from './TopMenu.styled'

interface ITopMenuProps {
  feedType: FeedFilter
  onChange: (type: FeedFilter) => void
  forwardRef: React.RefObject<HTMLDivElement>
}

const TopMenu: FC<ITopMenuProps> = ({ feedType, forwardRef, onChange }) => {
  return (
    <Wrapper ref={forwardRef}>
      <Button
        hover={false}
        bg={feedType === 'all' ? 'accent2' : 'primary'}
        scale={0.8}
        onClick={() => onChange('all')}
      >
        ALL
      </Button>

      <Button
        hover={false}
        bg={feedType === 'followed' ? 'accent2' : 'primary'}
        scale={0.8}
        onClick={() => onChange('followed')}
      >
        FOLLOWED
      </Button>

      <Button
        hover={false}
        bg={feedType === 'mine' ? 'accent2' : 'primary'}
        scale={0.8}
        onClick={() => onChange('mine')}
      >
        MINE
      </Button>
    </Wrapper>
  )
}

export default TopMenu
