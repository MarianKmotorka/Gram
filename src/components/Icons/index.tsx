import React from 'react'
import { motion } from 'framer-motion'
import Icon, { IIconBaseProps } from './Icon'
import { loadingProgressVariants } from './index.styled'

export interface IIconProps extends Omit<IIconBaseProps, 'name'> {}

export const ClockIcon: React.FC<IIconProps> = props => (
  <Icon name='far fa-clock' {...props} />
)

export const EditIcon: React.FC<IIconProps> = props => (
  <Icon name='far fa-edit' {...props} />
)

export const LoadingIcon: React.FC<IIconProps & { progress?: number }> = ({
  progress,
  ...rest
}) =>
  progress === undefined ? (
    <Icon name='fas fa-circle-notch fa-spin' {...rest} />
  ) : (
    <motion.div variants={loadingProgressVariants} {...rest} animate='animate'>
      {progress.toFixed()}%
    </motion.div>
  )

export const CloseIcon: React.FC<IIconProps> = props => (
  <Icon name='fas fa-times' {...props} />
)

export const TrashIcon: React.FC<IIconProps> = props => (
  <Icon name='far fa-trash-alt' {...props} />
)

export const HeartIcon: React.FC<IIconProps> = props => (
  <Icon name='far fa-heart' {...props} />
)

export const CommentsIcon: React.FC<IIconProps> = props => (
  <Icon name='fas fa-comment-dots' {...props} />
)

export const SearchIcon: React.FC<IIconProps> = props => (
  <Icon name='fas fa-search' {...props} />
)

export const BurgerMenuIcon: React.FC<IIconProps & { menuExpanded?: boolean }> = ({
  menuExpanded,
  ...rest
}) =>
  menuExpanded === false ? <Icon name='fas fa-bars' {...rest} /> : <CloseIcon {...rest} />

export const PowerOffIcon: React.FC<IIconProps> = props => (
  <Icon name='fas fa-power-off' {...props} />
)