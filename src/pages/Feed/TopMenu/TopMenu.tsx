import React, { FC } from 'react'

import { FeedFilter } from '../utils'
import { Button } from '../../../components'

import { Indicator, Wrapper } from './TopMenu.styled'

interface ITopMenuProps {
  feedType: FeedFilter
  onChange: (type: FeedFilter) => void
}

const TopMenu: FC<ITopMenuProps> = ({ feedType, onChange }) => {
  return (
    <Wrapper>
      <div className='allFilter filter'>
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

      <div className='followedFilter filter'>
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

      <div className='mineFilter filter'>
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

      <Indicator />
    </Wrapper>
  )
}

export default TopMenu
