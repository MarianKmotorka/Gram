import React, { useState, useCallback } from 'react'

import LoadingOverlay from '../../components/LoadingOverlay'
import { useAuthContext } from '../../contextProviders/AuthProvider'
import { IPost } from '../../domain/Post'
import useFirestore from '../../hooks/useFirestore'
import useStorage from '../../hooks/useStorage'

import { Image, Wrapper, Grid, UploadFileBtn, FileInput } from './MyImages.styled'

const MyImages = () => {
  const [file, setFile] = useState<File | null>()
  const { progress } = useStorage(file)
  const { user } = useAuthContext()
  const [posts, loading, error] = useFirestore<IPost>(
    useCallback(x => x.collection('posts').where('userId', '==', user?.uid), [user]) // order it somehow
  )

  if (loading)
    return (
      <Wrapper>
        <LoadingOverlay />
      </Wrapper>
    )

  return (
    <Wrapper>
      <p>Progress: {progress}</p>
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}

      <label>
        <FileInput
          type='file'
          accept='image/*'
          onChange={({ target }) => setFile(target.files && target.files[0])}
        />
        <UploadFileBtn>
          <i className='fas fa-plus'></i>
        </UploadFileBtn>
      </label>

      <Grid>
        {posts.map(x => (
          <Image key={x.id} src={x.imageUrl} layout />
        ))}
      </Grid>
    </Wrapper>
  )
}

export default MyImages
