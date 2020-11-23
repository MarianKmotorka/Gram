import React, { FC, useCallback } from 'react'

import { propertyOf } from '../../utils'
import { IComment, IPost } from '../../domain'
import { useFirestoreDoc, useFirestoreQuery } from '../../hooks'
import { useApiError } from '../../contextProviders/ApiErrorProvider'
import { useAuthorizedUser } from '../../contextProviders/AuthProvider'
import { PostDetail, PostDetailLoadingSkeleton } from '../../components'
import { useFollowers } from '../../contextProviders/FollowersProvider'
import {
  commentOnPost,
  deleteComment,
  deletePost,
  likePost,
} from '../../services/postService'

interface IPostDetailPageProps {
  postId: string
  deleteDisabled?: boolean
  onClose: () => void
  afterLikedCallback?: () => void
  afterDeletedCallback?: () => void
}

const PostDetailPage: FC<IPostDetailPageProps> = ({
  postId,
  deleteDisabled,
  onClose,
  afterLikedCallback,
  afterDeletedCallback,
}) => {
  const { setError } = useApiError()
  const { isFollowedByMe, handleFollowed } = useFollowers()
  const { currentUser } = useAuthorizedUser()
  const [response, { refresh }] = useFirestoreDoc<IPost>(`posts/${postId}`, {
    realTime: false,
  })

  const [comments, commentsLoading, commentsError] = useFirestoreQuery<IComment>(
    useCallback(
      x =>
        x
          .collection('comments')
          .where(propertyOf<IComment>('postId'), '==', postId)
          .orderBy(propertyOf<IComment>('timestamp'), 'desc'),
      [postId]
    )
  )

  if (response.loading || commentsLoading) return <PostDetailLoadingSkeleton />
  if (response.error || commentsError) {
    setError(response.error || commentsError)
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

  const handleCommentDeleted = async (id: string) => {
    deleteComment(id, setError)
  }

  const handleCommentSubmitted = async (text: string) => {
    const comment = {
      text,
      postId: post.id,
      userId: currentUser.id,
      userNick: currentUser.nick,
      userPhotoUrl: currentUser.photoUrl,
    }

    await commentOnPost(comment, setError)
  }

  return (
    <PostDetail
      post={post}
      comments={comments}
      currentUser={currentUser}
      canFollow={post.userId !== currentUser.id}
      canDelete={currentUser.id === post.userId && deleteDisabled !== true}
      onClose={onClose}
      onLike={handleLiked}
      onDelete={handleDeleted}
      onCommentSubmit={handleCommentSubmitted}
      onDeleteComment={handleCommentDeleted}
      isFollowed={isFollowedByMe(post.userId)}
      isLiked={post.likes.includes(currentUser.nick)}
      onFollow={async () => handleFollowed(post.userId, post.userNick)}
    />
  )
}

export default PostDetailPage
