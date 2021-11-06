import React, { FC, useEffect, useState } from 'react'

import { FeedFilter } from '../utils'
import { Button } from '../../../components'
import useHover from '../../../hooks/useHover'

import { ButtonsContainer, Indicator, Wrapper } from './TopMenu.styled'

interface ITopMenuProps {
  feedType: FeedFilter
  onChange: (type: FeedFilter) => void
}

const TopMenu: FC<ITopMenuProps> = ({ feedType, onChange }) => {
  const [buttonsContainerRef, isHovered] = useHover<HTMLDivElement>()
  const [allBtnRef, isAllBtnHovered] = useHover<HTMLDivElement>()
  const [followedBtnRef, isFollowedBtnHovered] = useHover<HTMLDivElement>()
  const [mineBtnRef, isMineBtnHovered] = useHover<HTMLDivElement>()
  const [lastHovered, setLastHovered] = useState<FeedFilter>('all')

  const getIndicatorOffset = () => {
    if (lastHovered === 'all') return 7
    if (lastHovered === 'followed') return 74
    return 186
  }

  const getIndicatorWidth = () => {
    if (lastHovered === 'all') return 48
    if (lastHovered === 'followed') return 90
    return 58
  }

  useEffect(() => {
    if (isAllBtnHovered) setLastHovered('all')
    if (isFollowedBtnHovered) setLastHovered('followed')
    if (isMineBtnHovered) setLastHovered('mine')
  }, [isAllBtnHovered, isFollowedBtnHovered, isMineBtnHovered])

  return (
    <Wrapper>
      <ButtonsContainer ref={buttonsContainerRef}>
        <div ref={allBtnRef}>
          <Button
            hover={false}
            scale={0.8}
            color={feedType === 'all' ? 'accent2' : 'white'}
            onClick={() => onChange('all')}
            bg='transparent'
          >
            ALL
          </Button>
        </div>

        <div ref={followedBtnRef}>
          <Button
            hover={false}
            scale={0.8}
            color={feedType === 'followed' ? 'accent2' : 'white'}
            onClick={() => onChange('followed')}
            bg='transparent'
          >
            FOLLOWED
          </Button>
        </div>

        <div ref={mineBtnRef}>
          <Button
            hover={false}
            scale={0.8}
            color={feedType === 'mine' ? 'accent2' : 'white'}
            onClick={() => onChange('mine')}
            bg='transparent'
          >
            MINE
          </Button>
        </div>

        <Indicator
          isHidden={isHovered ? 0 : 1}
          width={getIndicatorWidth()}
          offset={getIndicatorOffset()}
        />
      </ButtonsContainer>
    </Wrapper>
  )
}

export default TopMenu
