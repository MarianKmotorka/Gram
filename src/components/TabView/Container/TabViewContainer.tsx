import React, { FC, ReactNode, Children, isValidElement, useState } from 'react'
import { Tab, TabsWrapper, Wrapper } from './TabViewContainer.styled'

const getNameItemMap = (children: ReactNode) => {
  let map: { [key: string]: ReactNode } = {}

  Children.forEach(children, x => {
    if (isValidElement(x)) map[x.props.name as string] = x
  })

  return map
}

const TabViewContainer: FC = ({ children }) => {
  const tabNames = Object.keys(getNameItemMap(children))
  const [selectedName, setSelectedName] = useState(tabNames[0])
  const selectedItem = getNameItemMap(children)[selectedName]

  return (
    <Wrapper>
      <TabsWrapper>
        {tabNames.map(x => (
          <Tab active={x === selectedName} onClick={() => setSelectedName(x)}>
            {x}
          </Tab>
        ))}
      </TabsWrapper>

      {selectedItem}
    </Wrapper>
  )
}

export default TabViewContainer
