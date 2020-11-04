import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import { IPost } from '../../../domain'
import { useObserver } from '../../../hooks'
import Post from '../../../components/Post/Post'
import LoadingRow from '../../../components/Loaders/LoadingRow'
import { projectFirestore, projectStorage } from '../../../config/firebaseConfig'

import { BottomDiv, Grid, Image } from './Posts.styled'

interface IPostsProps {
  nick: string
  areMyPosts: boolean
  posts: IPost[]
  loading?: boolean
  loadMore: () => void
  refresh: () => void
}

const Posts: React.FC<IPostsProps> = ({
  areMyPosts,
  posts,
  nick,
  loading,
  loadMore,
  refresh,
}) => {
  const [selectedPost, setSelectedPost] = useState<IPost>()
  const observe = useObserver<HTMLDivElement>(loadMore, !loading)

  const handlePostDeleted = async (post: IPost) => {
    try {
      await projectStorage.refFromURL(post.imageUrl).delete()
      await projectFirestore.collection('posts').doc(post.id).delete()
      setSelectedPost(undefined)
      refresh()
    } catch (err) {
      console.log(err.response)
    }
  }

  return (
    <>
      <AnimatePresence>
        {selectedPost && (
          <Post
            post={selectedPost}
            onClose={() => setSelectedPost(undefined)}
            onDelete={handlePostDeleted}
            canDelete={areMyPosts}
          />
        )}
      </AnimatePresence>

      {posts.length === 0 && (
        <p>
          {areMyPosts
            ? 'You have no posts yet ... :(('
            : `${nick} has no posts yet ... :((`}
        </p>
      )}

      <Grid>
        {posts.map(x => (
          <Image
            key={x.id}
            src={x.imageUrl}
            onClick={() => setSelectedPost(x)}
            whileHover={{
              scale: 0.95,
            }}
          />
        ))}
      </Grid>

      {loading && <LoadingRow />}

      <BottomDiv ref={observe} />
    </>
  )
}

export default Posts
