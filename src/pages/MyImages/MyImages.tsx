import React from 'react'
import LoadingOverlay from '../../components/LoadingOverlay'

import { IPost } from '../../domain/Post'
import useFirestore from '../../hooks/useFirestore'

import { Image, Wrapper, Grid } from './MyImages.styled'

const MyImages = () => {
  const [posts, loading, error] = useFirestore<IPost>('images')

  if (loading)
    return (
      <Wrapper>
        <LoadingOverlay />
      </Wrapper>
    )

  return (
    <Wrapper>
      <Grid>
        {posts.map(x => (
          <Image src={x.url} />
        ))}
      </Grid>
    </Wrapper>
  )
}

export default MyImages
