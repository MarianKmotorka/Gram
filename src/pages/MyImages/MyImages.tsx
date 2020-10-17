import React, { useState, useCallback } from 'react'

import LoadingOverlay from '../../components/LoadingOverlay'
import Post from '../../components/Post/Post'
import { projectFirestore, projectStorage } from '../../config/firebaseConfig'
import { useAuthContext } from '../../contextProviders/AuthProvider'
import { IPost } from '../../domain/Post'
import useFirestore from '../../hooks/useFirestore'
import useStorage from '../../hooks/useStorage'

import { Image, Wrapper, Grid, UploadFileBtn, FileInput } from './MyImages.styled'

const MyImages = () => {
  const [file, setFile] = useState<File | null>()
  const [selectedPost, setSelectedPost] = useState<IPost>()
  const { progress } = useStorage(file)
  const { user } = useAuthContext()
  const [posts, loading, error] = useFirestore<IPost>(
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

      <p>Progress: {progress}</p>
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}

      <label>
        <FileInput
          type='file'
          accept='image/*'
          onChange={({ target }) => setFile(target.files && target.files[0])}
          disabled={!!file && progress < 100}
        />
        <UploadFileBtn>
          <i className='fas fa-plus'></i>
        </UploadFileBtn>
      </label>

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
