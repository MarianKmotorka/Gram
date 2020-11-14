import React, { FC } from 'react'

import { useFirestoreDoc } from '../../hooks'
import PostDetailLoadingSkeleton from '../../components/Post/Detail/PostDetailLoadingSkeleton'

import { IComment, IPost } from '../../domain'
import PostDetail from '../../components/Post/Detail/PostDetail'
import { commentOnPost, deletePost, likePost } from '../../services/postService'
import { useApiError } from '../../contextProviders/ApiErrorProvider'
import { useAuthorizedUser } from '../../contextProviders/AuthProvider'

interface IPostDetailPageProps {
  postId: string
  canDelete: boolean
  onClose: () => void
  afterLikedCallback?: () => void
  afterDeletedCallback?: () => void
}

const PostDetailPage: FC<IPostDetailPageProps> = ({
  postId,
  canDelete,
  onClose,
  afterLikedCallback,
  afterDeletedCallback,
}) => {
  const { setError } = useApiError()
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

  const post = response.data

  const handleLiked = async () => {
    await likePost(post, currentUser.nick)
    refresh()
    afterLikedCallback && afterLikedCallback()
  }

  const handleDeleted = async () => {
    await deletePost(post, setError)
    onClose()
    afterDeletedCallback && afterDeletedCallback()
  }

  const handleCommentSubmitted = async (text: string) => {
    const comment = {
      text,
      userId: currentUser.id,
      userNick: currentUser.nick,
      userPhotoUrl: currentUser.photoUrl,
    }

    await commentOnPost(comment, post.id, setError)
  }

  return (
    <PostDetail
      post={response.data}
      canDelete={canDelete}
      comments={[]}
      currentUser={currentUser}
      isLiked={post.likes.includes(currentUser.nick)}
      onClose={onClose}
      onLike={handleLiked}
      onDelete={handleDeleted}
      onCommentSubmit={handleCommentSubmitted}
    />
  )
}

export default PostDetailPage
