import React, { useState, useEffect, TextareaHTMLAttributes, useRef } from 'react'

const AutoTextArea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null!)
  const [textAreaHeight, setTextAreaHeight] = useState('auto')
  const [parentHeight, setParentHeight] = useState('auto')

  const text = textAreaRef.current?.value

  useEffect(() => {
    if (!text) {
      setParentHeight('auto')
      setTextAreaHeight('auto')
      return
    }

    setParentHeight(`${textAreaRef.current!.scrollHeight}px`)
    setTextAreaHeight(`${textAreaRef.current!.scrollHeight}px`)
  }, [text, textAreaRef])

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaHeight('auto')
    setParentHeight(`${textAreaRef.current!.scrollHeight}px`)

    if (props.onChange) {
      props.onChange(e)
    }
  }

  const handleKeyPressed = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) e.preventDefault()

    if (props.onKeyPress) {
      props.onKeyPress(e)
    }
  }

  return (
    <div
      style={{
        minHeight: parentHeight,
      }}
    >
      <textarea
        {...props}
        ref={textAreaRef}
        onKeyPress={handleKeyPressed}
        rows={1}
        style={{
          height: textAreaHeight,
        }}
        onChange={onChangeHandler}
      />
    </div>
  )
}

export default AutoTextArea
