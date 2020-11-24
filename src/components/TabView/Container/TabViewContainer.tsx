import React, { FC, ReactNode, Children, isValidElement, useState, useMemo } from 'react'
import { Tab, TabsWrapper, Wrapper } from './TabViewContainer.styled'

interface IProps {
  selectedTabName?: string
  onChange?: (tabName: string) => void
}

const getNameItemMap = (children: ReactNode) => {
  let map: { [key: string]: ReactNode } = {}

  Children.forEach(children, x => {
    if (isValidElement(x)) map[x.props.name as string] = x
  })

  return map
}

const TabViewContainer: FC<IProps> = ({
  selectedTabName: tabName,
  children,
  onChange,
}) => {
  const tabNames = useMemo(() => Object.keys(getNameItemMap(children)), [children])
  const [_tabName, _setTabName] = useState(tabNames[0])

  const selectedTabName = tabName || _tabName
  const selectedItem = getNameItemMap(children)[selectedTabName]

  const handleTabClicked = (newTabName: string) => {
    if (onChange) {
      onChange(newTabName)
      return
    }

    _setTabName(newTabName)
  }

  return (
    <Wrapper>
      <TabsWrapper>
        {tabNames.map(x => (
          <Tab key={x} active={x === selectedTabName} onClick={() => handleTabClicked(x)}>
            {x}
          </Tab>
        ))}
      </TabsWrapper>

      {selectedItem}
    </Wrapper>
  )
}

export default TabViewContainer
