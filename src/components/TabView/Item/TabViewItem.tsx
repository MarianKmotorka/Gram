import React, { ReactNode } from 'react'

import { Wrapper } from './TabViewItem.styled'

export interface ITabViewItemProps<T> {
  tabKey: T
  name: string
  children?: ReactNode
}

function TabViewItem<T>({ children }: ITabViewItemProps<T>) {
  return <Wrapper>{children}</Wrapper>
}

export default TabViewItem
