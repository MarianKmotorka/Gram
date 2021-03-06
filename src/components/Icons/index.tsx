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
    <Icon name='fas fa-circle-notch fa-spin' color='accent' fontSize='30px' {...rest} />
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

export const HeartFilledIcon: React.FC<IIconProps> = props => (
  <Icon name='fas fa-heart' {...props} />
)

export const CommentsIcon: React.FC<IIconProps> = props => (
  <Icon name='far fa-comments' {...props} />
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

export const IglooIcon: React.FC<IIconProps> = props => (
  <Icon name='fas fa-igloo' {...props} />
)

export const UserIcon: React.FC<IIconProps> = props => (
  <Icon name='fas fa-user' {...props} />
)

export const UserShieldIcon: React.FC<IIconProps> = props => (
  <Icon name='fas fa-user-shield' {...props} />
)

export const PlusIcon: React.FC<IIconProps> = props => (
  <Icon name='fas fa-plus' {...props} />
)

export const UserPlusIcon: React.FC<IIconProps> = props => (
  <Icon name='fas fa-user-plus' {...props} />
)

export const EnvelopeIcon: React.FC<IIconProps> = props => (
  <Icon name='far fa-envelope' {...props} />
)

export const UserSecretIcon: React.FC<IIconProps> = props => (
  <Icon name='fas fa-user-secret' {...props} />
)

export const BlindManIcon: React.FC<IIconProps> = props => (
  <Icon name='fas fa-blind' {...props} />
)

export const GridIcon: React.FC<IIconProps> = props => (
  <Icon name='fas fa-th' {...props} />
)

export const RoundSquareIcon: React.FC<IIconProps> = props => (
  <Icon name='fas fa-stop' {...props} />
)

export const ChevronUpIcon: React.FC<IIconProps> = props => (
  <Icon name='fas fa-chevron-up' {...props} />
)

export const ChevronLeftIcon: React.FC<IIconProps> = props => (
  <Icon name='fas fa-chevron-left' {...props} />
)

export const ChevronRightIcon: React.FC<IIconProps> = props => (
  <Icon name='fas fa-chevron-right' {...props} />
)

export const ExpandIcon: React.FC<IIconProps> = props => (
  <Icon name='fas fa-expand-alt' {...props} />
)

export const CameraIcon: React.FC<IIconProps> = props => (
  <Icon name='fas fa-camera' {...props} />
)

export const VideoIcon: React.FC<IIconProps> = props => (
  <Icon name='fas fa-video' {...props} />
)
