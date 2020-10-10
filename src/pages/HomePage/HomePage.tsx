import React from 'react'
import useFirestore from '../../hooks/useFirestore'

import { Wrapper } from './HomePage.styled'

const HomePage: React.FC = () => {
  const [images, isLoading, error] = useFirestore<any>('images')

  return (
    <Wrapper>
      HOME <div className=''>{isLoading ? 'Loading' : 'Loaded'}</div>
      <div className=''>
        {images.map(x => (
          <p>{x.url}</p>
        ))}
      </div>
      <pre>{error && JSON.stringify(error, null, 2)}</pre>
    </Wrapper>
  )
}

export default HomePage
