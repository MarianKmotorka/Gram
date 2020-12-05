import React, { ReactNode, Children, isValidElement, useState, useMemo } from 'react'
import { Tab, TabsWrapper, Wrapper } from './TabViewContainer.styled'

interface IProps<TKey> {
  selectedKey?: TKey
  onChange?: (key: TKey) => void
  children: ReactNode
}

interface IKeyTabPair<TKey> {
  key: TKey
  tab: { component: ReactNode; name: string }
}

function getKeyTabPairs<TKey>(children: ReactNode) {
  let keyTabPairs: IKeyTabPair<TKey>[] = []

  Children.forEach(children, x => {
    if (isValidElement(x))
      keyTabPairs.push({ key: x.props.tabKey, tab: { component: x, name: x.props.name } })
  })

  return keyTabPairs
}

function TabViewContainer<TKey>({ selectedKey: key, children, onChange }: IProps<TKey>) {
  const keyTabPairs = useMemo(() => getKeyTabPairs<TKey>(children), [children])
  const [_selectedKey, _setSelectedKey] = useState(keyTabPairs.map(x => x.key)[0])

  const selectedKey = key || _selectedKey

  const handleTabClicked = (newTabName: TKey) => {
    if (onChange) {
      onChange(newTabName)
      return
    }

    _setSelectedKey(newTabName)
  }

  return (
    <Wrapper>
      <TabsWrapper>
        {keyTabPairs.map(x => (
          <Tab
            key={`${x.key}`}
            active={x.key === selectedKey}
            onClick={() => handleTabClicked(x.key)}
          >
            {x.tab.name}
          </Tab>
        ))}
      </TabsWrapper>

      {keyTabPairs.find(x => x.key === selectedKey)?.tab.component}
    </Wrapper>
  )
}

export default TabViewContainer
