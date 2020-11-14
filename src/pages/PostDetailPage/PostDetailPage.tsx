import React, { FC } from 'react'

import { useFirestoreDoc } from '../../hooks'
import PostDetailLoadingSkeleton from '../../components/Post/Detail/PostDetailLoadingSkeleton'

import { IPost } from '../../domain'
import PostDetail from '../../components/Post/Detail/PostDetail'
import { useApiErrorContext } from '../../contextProviders/ApiErrorProvider'
import { useAuthorizedUser } from '../../contextProviders/AuthProvider'
import { likePost } from '../../services/postService'

interface IPostDetailPageProps {
  postId: string
  canDelete: boolean
  onClose: () => void
  afterLikedCallback?: () => void
  onDelete?: (post: IPost) => Promise<void>
}

const PostDetailPage: FC<IPostDetailPageProps> = ({
  postId,
  onClose,
  afterLikedCallback,
  ...rest
}) => {
  const { setError } = useApiErrorContext()
  const { currentUser } = useAuthorizedUser()
  const [response, { refresh }] = useFirestoreDoc<IPost>(`posts/${postId}`, {
    realTime: false,
  })

  if (response.loading) return <PostDetailLoadingSkeleton />
  if (response.error) {
    setError(response.error)
    onClose()
    return <></>
  }

  const handleLiked = async () => {
    await likePost(response.data, currentUser.nick)
    refresh()
    afterLikedCallback && afterLikedCallback()
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
