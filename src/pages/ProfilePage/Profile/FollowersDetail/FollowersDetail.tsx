import React, { FC } from 'react'
import { TabView } from '../../../../components'

import { Wrapper } from './FollowersDetail.styled'

interface IFollowersDetailProps {}

const FollowersDetail: FC<IFollowersDetailProps> = ({}) => {
  return (
    <Wrapper>
      <TabView.Container>
        <TabView.Item name='Following'>FOLLOWING</TabView.Item>
        <TabView.Item name='Followed by'>FOLLOWED BY</TabView.Item>
      </TabView.Container>
    </Wrapper>
  )
}

export default FollowersDetail
