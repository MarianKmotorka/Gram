import React, { useState } from 'react'

import { IUser } from '../../../domain'
import useUplaodPost from './useUploadPost'
import { CloseIcon } from '../../../components/Icons'
import { IBackdropProps } from '../../../components/Backdrop'
import { Padding } from '../../../components/UtilityComponents'
import { MessageStripe, Backdrop } from '../../../components'

import { FileInput, Header, StyledButton, StyledInput } from './CreatePostForm.styled'
import SideBlade from '../../../components/SideBlade/SideBlade'

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
    'posts/images',
    file,
    {
      title,
      description,
      userId: user.id,
      userNick: user.nick,
      userPhotoUrl: user.photoUrl,
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

  const handleClosed = uploading ? undefined : onClose

  return (
    <Backdrop onClose={handleClosed}>
      <SideBlade onClose={handleClosed} closeIcon={<CloseIcon color='bg' />}>
        <Header>
          <h2>New post</h2>
        </Header>

        <Padding value='0 25px'>
          {validationError && <MessageStripe textType='error' text={validationError} />}
          {uploadError && (
            <MessageStripe
              textType='error'
              text={`${uploadError.name}: ${uploadError.message}`}
            />
          )}

          <StyledInput
            label='Post title'
            placeholder='Title'
            onChange={setTitle}
            value={title}
            disabled={progress > 0}
          />

          <StyledInput
            disabled={progress > 0}
            label='More about your post'
            placeholder='More ...'
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
            bg='accent2'
            color='bg'
            disabled={uploading}
            onClick={handleSelectFile}
          >
            Pick an image
          </StyledButton>

          <StyledButton
            color='bg'
            loadingProgress={progress}
            isLoading={uploading}
            onClick={handleSubmit}
          >
            Submit
          </StyledButton>
        </Padding>
      </SideBlade>
    </Backdrop>
  )
}

export default CreatePostForm
