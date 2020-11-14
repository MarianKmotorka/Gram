import styled from 'styled-components'
import { lightenColor } from '../../../../utils/utils'
import AutoTextArea from '../../../Inputs/AutoTextArea'
import { TAB_BAR_HEIGHT_PX } from '../../../TabView/Container/TabViewContainer.styled'

export const Wrapper = styled.div`
  max-height: calc(100vh - ${TAB_BAR_HEIGHT_PX});
  width: 100%;
`

export const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: calc(100vh - ${TAB_BAR_HEIGHT_PX});
  overflow-y: auto;
  padding: 20px 10px;

  > * + * {
    margin-top: 10px;
  }
`

export const Metadata = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(40, 62, 74, 0.4);
  margin-bottom: 6px;
  cursor: pointer;
  position: relative;

  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 5px;
  }

  h6 {
    font-size: 0.9rem;
    ::first-letter {
      color: ${({ theme }) => theme.green};
    }
  }

  p {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.blackLight};
  }

  span {
    display: flex;
    align-items: center;
  }
`

export const CommentContainer = styled.div<{ bg?: string }>`
  background: ${({ theme, bg }) => (bg && theme[bg]) || theme.white};
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: 10px;
  border-radius: 4px;
`

export const Text = styled.p`
  padding-top: 5px;
  line-height: 20px;
  font-size: 0.95rem;
`

export const TextInput = styled(AutoTextArea)`
  border: none;
  outline: none;
  resize: none;
  width: 100%;
  padding-top: 5px;
  line-height: 20px;
  font-size: 0.95rem;
`

export const SubmitBtn = styled.button`
  border: none;
  outline: none;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  border-radius: 4px;
  padding: 3px 10px;
  cursor: pointer;
  font-size: 0.7rem;
  transition: background-color 0.3s;

  position: absolute;
  top: 0px;
  right: 0px;

  :hover {
    background: ${({ theme }) => lightenColor(theme.primary, 0.9)};
  }
`
