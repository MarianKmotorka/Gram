import React, { FC } from 'react'
import { Button } from '../../../components'
import { FeedType } from '../utils'
import { Wrapper } from './TopMenu.styled'

interface ITopMenuProps {
  feedType: FeedType
  onChange: (type: FeedType) => void
  forwardRef: React.RefObject<HTMLDivElement>
}

const TopMenu: FC<ITopMenuProps> = ({ feedType, forwardRef, onChange }) => {
  const feedTypeMap: Record<FeedType, string> = {
    followedOnly: 'FOLLOWED',
    all: 'ALL',
  }

  const hanldeChanged = () =>
    feedType === 'all' ? onChange('followedOnly') : onChange('all')

  return (
    <Wrapper ref={forwardRef}>
      <p>Now showing</p>
      <Button hover={false} scale={0.8} onClick={hanldeChanged}>
        {feedTypeMap[feedType]}
      </Button>
      <p>posts.</p>
    </Wrapper>
  )
}

export default TopMenu
