import React, { useState, useCallback } from 'react'
import Button from '../../components/Button/Button'

import LoadingOverlay from '../../components/LoadingOverlay'
import Post from '../../components/Post/Post'
import { projectFirestore, projectStorage } from '../../config/firebaseConfig'
import { useAuthContext } from '../../contextProviders/AuthProvider'
import { IPost } from '../../domain/IPost'
import useFirestore from '../../hooks/useFirestore'
import CreatePostForm from './CreatePostForm/CreatePostForm'

import { Image, Wrapper, Grid } from './MyImages.styled'

const MyImages = () => {
  const [selectedPost, setSelectedPost] = useState<IPost>()
  const [showCreatePostForm, setShowCreatePostForm] = useState(false)
  const { user } = useAuthContext()
  const [posts, loading] = useFirestore<IPost>(
    useCallback(
      x =>
        x
          .collection('posts')
          .where('userId', '==', user?.uid)
          .orderBy('createdAt', 'desc'),
      [user]
    )
  )

  if (loading)
    return (
      <Wrapper>
        <LoadingOverlay />
      </Wrapper>
    )

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
    <Wrapper>
      {selectedPost && (
        <Post
          post={selectedPost}
          onClose={() => setSelectedPost(undefined)}
          onDelete={handlePostDeleted}
        />
      )}

      {showCreatePostForm && (
        <CreatePostForm onClose={() => setShowCreatePostForm(false)} />
      )}

      <Button onClick={() => setShowCreatePostForm(true)}>New post</Button>

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
    </Wrapper>
  )
}

export default MyImages
