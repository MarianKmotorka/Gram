import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { IPost } from '../../../domain'
import { propertyOf } from '../../../utils'
import { LoadingRow } from '../../../components'
import { isLiked } from '../../../services/postService'
import { useObserver, useUrlQueryParams } from '../../../hooks'
import PostDetailPage from '../../PostDetailPage/PostDetailPage'
import { useAuthorizedUser } from '../../../providers/AuthProvider'
import {
  GridIcon,
  RoundSquareIcon,
  CameraIcon,
  VideoIcon,
  HeartIcon,
  CommentsIcon,
} from '../../../components/Icons'

import {
  BottomDiv,
  Grid,
  GridItem,
  GridItemOverlay,
  Image,
  LayoutControls,
  VerticalSeparator,
  Video,
  Wrapper,
} from './Posts.styled'

interface IPostsProps {
  posts: IPost[]
  loading?: boolean
  loadMore: () => void
  refresh: () => void
  modifyPost: (modifiedPost: IPost) => void
}

const Posts: React.FC<IPostsProps> = ({
  posts,
  loading,
  loadMore,
  refresh,
  modifyPost,
}) => {
  const { location, push } = useHistory()
  const { currentUser } = useAuthorizedUser()
  const { postId: selectedPostId } = useUrlQueryParams()
  const [displayGrid, setDisplayGrid] = useState(true)
  const observe = useObserver<HTMLDivElement>(loadMore, !loading)

  const updateLikeCount = (post?: IPost) => {
    if (post === undefined) return

    const newLikes = isLiked(post, currentUser.nick)
      ? post.likes.filter(x => x !== currentUser.nick)
      : [...post.likes, currentUser.nick]

    modifyPost({ ...post, [propertyOf<IPost>('likes')]: newLikes })
  }

  const updateCommentCount = (commentAdded: boolean, post?: IPost) => {
    if (post === undefined) return
    const currCount = post.commentCount || 0
    const newCount = commentAdded ? currCount + 1 : currCount - 1
    modifyPost({ ...post, [propertyOf<IPost>('commentCount')]: newCount })
  }

  return (
    <Wrapper>
      {selectedPostId && (
        <PostDetailPage
          postId={selectedPostId as string}
          afterDeletedCallback={refresh}
          onClose={() => push(location.pathname)}
          afterLikedCallback={() =>
            updateLikeCount(posts.find(x => x.id === selectedPostId))
          }
          afterCommentAddedOrDeletedCallback={added =>
            updateCommentCount(
              added,
              posts.find(x => x.id === selectedPostId)
            )
          }
        />
      )}

      <LayoutControls>
        <RoundSquareIcon
          color={displayGrid ? 'bg2' : 'accent2'}
          onClick={() => setDisplayGrid(false)}
        />
        <VerticalSeparator />
        <GridIcon
          color={displayGrid ? 'accent2' : 'bg2'}
          onClick={() => setDisplayGrid(true)}
        />
      </LayoutControls>

      {posts.length === 0 && <p>Nothing here ... :(</p>}

      <Grid smallScreenGrid={displayGrid}>
        {posts.map(x => {
          const isImage = x.mediaType.startsWith('image')
          const MediaTypeIcon = isImage ? CameraIcon : VideoIcon

          return (
            <GridItem
              key={x.id}
              smallScreenGrid={displayGrid}
              onClick={() => push(`${location.pathname}?postId=${x.id}`)}
            >
              {isImage ? <Image src={x.mediaUrl} /> : <Video src={x.mediaUrl} />}

              <GridItemOverlay smallScreenGrid={displayGrid}>
                <MediaTypeIcon />

                <section>
                  <span>
                    <HeartIcon /> {x.likes.length}
                  </span>
                  <span>
                    <CommentsIcon /> {x.commentCount}
                  </span>
                </section>
              </GridItemOverlay>
            </GridItem>
          )
        })}
      </Grid>

      {loading && <LoadingRow />}

      <BottomDiv ref={observe} />
    </Wrapper>
  )
}

export default Posts
