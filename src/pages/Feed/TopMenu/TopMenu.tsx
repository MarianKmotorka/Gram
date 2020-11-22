import React, { FC } from 'react'
import invert from 'lodash/invert'
import keys from 'lodash/keys'

import { Button } from '../../../components'
import { FeedFilter } from '../utils'

import { Wrapper } from './TopMenu.styled'

interface ITopMenuProps {
  feedType: FeedFilter
  onChange: (type: FeedFilter) => void
  forwardRef: React.RefObject<HTMLDivElement>
}

const TopMenu: FC<ITopMenuProps> = ({ feedType, forwardRef, onChange }) => {
  const feedTypeToNumber: Record<FeedFilter, number> = {
    followed: 0,
    all: 1,
    mine: 2,
  }

  const hanldeChanged = () => {
    const newNumber = (feedTypeToNumber[feedType] + 1) % keys(feedTypeToNumber).length
    const newFeedType = invert(feedTypeToNumber)[newNumber] as FeedFilter
    onChange(newFeedType)
  }

  return (
    <Wrapper ref={forwardRef}>
      <p>Now showing</p>

      <Button hover={false} scale={0.8} onClick={hanldeChanged}>
        {feedType.toUpperCase()}
      </Button>

      <p>posts.</p>
    </Wrapper>
  )
}

export default TopMenu
