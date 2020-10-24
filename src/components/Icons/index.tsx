import React from 'react'
import Icon, { IIconProps } from './Icon'

interface IProps extends Omit<IIconProps, 'name'> {}

export const ClockIcon: React.FC<IProps> = props => {
  return <Icon name='far fa-clock' {...props}></Icon>
}

export const EditIcon: React.FC<IProps> = props => {
  return <Icon name='far fa-edit' {...props}></Icon>
}
