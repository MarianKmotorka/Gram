import React, { useState } from 'react'

import Post from '../../../components/Post/Post'
import { IPost } from '../../../domain'
import { projectFirestore, projectStorage } from '../../../config/firebaseConfig'

import { Grid, Image } from './Posts.styled'

interface IPostsProps {
  nick: string
  areMyPosts: boolean
  posts: IPost[]
}

const Posts: React.FC<IPostsProps> = ({ areMyPosts, posts, nick }) => {
  const [selectedPost, setSelectedPost] = useState<IPost>()

  const handlePostDeleted = async (post: IPost) => {
    try {
      await projectFirestore.collection('posts').doc(post.id).delete()
      await projectStorage.refFromURL(post.imageUrl).delete()
      setSelectedPost(undefined)
    } catch (err) {
      console.log(err.response)
    }
  }

  return (
    <>
      {selectedPost && (
        <Post
          post={selectedPost}
          onClose={() => setSelectedPost(undefined)}
          onDelete={handlePostDeleted}
          canDelete={areMyPosts}
        />
      )}

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
            layout
            whileHover={{ scale: 1.1 }}
          />
        ))}
      </Grid>
    </>
  )
}

export default Posts
