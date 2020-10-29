import React, { useEffect, useState } from 'react'
import Backdrop, { IBackdropProps } from '../../../components/Backdrop'
import Button from '../../../components/Button/Button'
import { CloseIcon } from '../../../components/Icons'
import MessageStripe from '../../../components/MessageStripe'
import { Padding } from '../../../components/UtilityComponents'
import { getTimestamp, projectFirestore } from '../../../config/firebaseConfig'
import { IPost, IUser } from '../../../domain'
import useStorage from '../../../hooks/useStorage'

import {
  FileInput,
  Header,
  StyledButton,
  StyledInput,
  Wrapper,
} from './CreatePostForm.styled'

interface ICreatePostProps {
  user: IUser
  onClose: Required<IBackdropProps>['onClose']
}

const CreatePostForm: React.FC<ICreatePostProps> = ({ user, onClose }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [validationError, setValidationError] = useState('')

  const [file, setFile] = useState<File | null>()
  const [startUpload, setStartUpload] = useState(false)
  const { progress, error: uploadError, url } = useStorage(file, startUpload)

  useEffect(() => {
    const createPost = async () => {
      if (!url) return

      const newPost: Omit<IPost, 'id'> = {
        createdAt: getTimestamp() as firebase.firestore.Timestamp,
        userId: user.id,
        userNick: user.nick,
        userPhotoUrl: user.photoUrl || null,
        imageUrl: url,
        title,
        description,
      }

      await projectFirestore.collection('posts').add(newPost)
      onClose()
    }

    createPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, user])

  const handleSelectFile = () => {
    document.getElementById('create-post-form-file-input')?.click()
    setValidationError('')
  }

  const handleSubmit = () => {
    setValidationError('')
    if (!title) return setValidationError('Post title cannot be empty.')
    if (!file) return setValidationError('Pick an image.')
    setStartUpload(true)
  }

  return (
    <Backdrop onClose={onClose}>
      <Wrapper initial={{ y: '-50vh' }} animate={{ y: 0 }} exit={{ y: '-50vh' }}>
        <Header>
          <h2>New post</h2>
          <Button buttonType='action' icon={<CloseIcon />} onClick={onClose} />
        </Header>

        <Padding value='0 25px'>
          {validationError && <MessageStripe textType='error' text={validationError} />}
          {uploadError && <MessageStripe textType='error' text={uploadError.name} />}

          <StyledInput
            label='Post title'
            onChange={setTitle}
            value={title}
            disabled={progress > 0}
          />

          <StyledInput
            disabled={progress > 0}
            label='More about your post'
            onChange={setDescription}
            value={description}
            rows={4}
          />

          {file && <MessageStripe text={file.name} />}

          <FileInput
            id='create-post-form-file-input'
            type='file'
            accept='image/*'
            onChange={({ target }) => setFile(target.files && target.files[0])}
            disabled={progress !== 0}
          />

          <StyledButton
            primaryColor='green'
            disabled={progress > 0}
            onClick={handleSelectFile}
          >
            Pick an image
          </StyledButton>

          <StyledButton
            onClick={handleSubmit}
            loadingProgress={progress}
            isLoading={startUpload}
            marginLeft='auto'
            reversed={!startUpload}
          >
            Submit
          </StyledButton>
        </Padding>
      </Wrapper>
    </Backdrop>
  )
}

export default CreatePostForm
