import React, { FC } from 'react'

import { Wrapper } from './TabViewItem.styled'

export interface ITabViewItemProps {
  name: string
}

const TabViewItem: FC<ITabViewItemProps> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

export default TabViewItem
