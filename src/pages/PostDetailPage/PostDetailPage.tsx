import React, { FC } from 'react'

import { useFirestoreDoc } from '../../hooks'
import PostDetailLoadingSkeleton from '../../components/Post/Detail/PostDetailLoadingSkeleton'

import { IPost } from '../../domain'
import PostDetail from '../../components/Post/Detail/PostDetail'
import { useApiErrorContext } from '../../contextProviders/ApiErrorProvider'
import { useAuthorizedUser } from '../../contextProviders/AuthProvider'

interface IPostDetailPageProps {
  postId: string
  canDelete: boolean
  onClose: () => void
  onLike: () => Promise<void>
  onDelete?: (post: IPost) => Promise<void>
}

const PostDetailPage: FC<IPostDetailPageProps> = ({
  postId,
  onClose,
  onLike,
  ...rest
}) => {
  const { setError } = useApiErrorContext()
  const { currentUser } = useAuthorizedUser()
  const [response, { refresh }] = useFirestoreDoc<IPost>(`posts/${postId}`, {
    realTime: false,
  })

  const handleLiked = async () => {
    await onLike()
    refresh()
  }

  if (response.loading) return <PostDetailLoadingSkeleton />
  if (response.error) {
    setError(response.error)
    onClose()
    return <></>
  }

  return (
    <PostDetail
      {...rest}
      post={response.data}
      isLiked={response.data.likes.includes(currentUser.nick)}
      onClose={onClose}
      onLike={handleLiked}
    />
  )
}

export default PostDetailPage
