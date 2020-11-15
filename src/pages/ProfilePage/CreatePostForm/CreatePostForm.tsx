import React, { useState } from 'react'

import { IUser } from '../../../domain'
import useUplaodPost from './useUploadPost'
import { CloseIcon } from '../../../components/Icons'
import { IBackdropProps } from '../../../components/Backdrop'
import { Padding } from '../../../components/UtilityComponents'
import { MessageStripe, Button, Backdrop } from '../../../components'

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
  onPostCreated: () => void
}

const CreatePostForm: React.FC<ICreatePostProps> = ({ user, onClose, onPostCreated }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [validationError, setValidationError] = useState('')

  const [file, setFile] = useState<File | null>(null)
  const { startUpload, uploading, uploadError, progress } = useUplaodPost(
    file,
    {
      title,
      description,
      userId: user.id,
      userNick: user.nick,
      userPhotoUrl: user.photoUrl,
      likes: [],
    },
    onPostCreated
  )

  const handleSelectFile = () => {
    document.getElementById('create-post-form-file-input')?.click()
    setValidationError('')
  }

  const handleSubmit = () => {
    setValidationError('')
    if (!title) return setValidationError('Post title cannot be empty.')
    if (!file) return setValidationError('Pick an image.')
    startUpload()
  }

  const handleClosed = () => {
    if (uploading) return setValidationError('Please wait until upload is finished.')
    onClose()
  }

  return (
    <Backdrop onClose={uploading ? undefined : onClose}>
      <Wrapper initial={{ y: '-50vh' }} animate={{ y: 0 }} exit={{ y: '-50vh' }}>
        <Header>
          <h2>New post</h2>
          <Button buttonType='action' icon={<CloseIcon />} onClick={handleClosed} />
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
            disabled={uploading}
            onClick={handleSelectFile}
          >
            Pick an image
          </StyledButton>

          <StyledButton
            marginLeft='auto'
            loadingProgress={progress}
            isLoading={uploading}
            reversed={!uploading}
            onClick={handleSubmit}
          >
            Submit
          </StyledButton>
        </Padding>
      </Wrapper>
    </Backdrop>
  )
}

export default CreatePostForm
