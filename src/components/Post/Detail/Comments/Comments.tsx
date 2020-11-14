import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { IComment, IUser } from '../../../../domain'
import noPhoto from '../../../../images/no-photo.png'

import {
  CommentContainer,
  CommentsContainer,
  Metadata,
  SubmitBtn,
  Text,
  TextInput,
  Wrapper,
} from './Comments.styled'

interface ICommentsProps {
  comments: IComment[]
  currentUser: IUser
  onSubmit: (text: string) => Promise<void>
}

const Comments: FC<ICommentsProps> = ({ comments, currentUser, onSubmit }) => {
  const history = useHistory()
  const [text, setText] = useState('')

  const handleSubmitted = async () => {
    if (!text) return
    await onSubmit(text)
    setText('')
  }

  const renderComment = ({
    id,
    userId,
    userNick,
    userPhotoUrl,
    text,
    timestamp,
  }: IComment) => {
    const sentAt = timestamp ? timestamp.toDate() : new Date() // firebase sends null from snapshot listener

    return (
      <CommentContainer key={id}>
        <Metadata onClick={() => history.push(`/profile/${userId}`)}>
          <span>
            <img src={userPhotoUrl || noPhoto} alt='user' />
            <h6>{userNick}</h6>
          </span>
          <p>{moment(sentAt).format('MMMM Do YYYY, H:mm')}</p>
        </Metadata>

        <Text>{text}</Text>
      </CommentContainer>
    )
  }

  const newComment = (
    <CommentContainer>
      <Metadata>
        <span>
          <img src={currentUser.photoUrl || noPhoto} alt='user' />
          <h6>{currentUser.nick}</h6>
        </span>
        <p>Now</p>
        <SubmitBtn onClick={handleSubmitted}>Send</SubmitBtn>
      </Metadata>

      <TextInput
        placeholder='TYPE HERE ....'
        onChange={e => setText(e.target.value)}
        value={text}
      />
    </CommentContainer>
  )

  return (
    <Wrapper>
      <CommentsContainer>
        {newComment}
        {comments.map(renderComment)}
      </CommentsContainer>
    </Wrapper>
  )
}

export default Comments
