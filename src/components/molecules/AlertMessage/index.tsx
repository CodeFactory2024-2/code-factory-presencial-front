import React from 'react'
import MainText from '@/components/atoms/MainText/index'
import { MainTitle } from '@/components/atoms/Title/index'

type AlertMessageProps = {
  idTitle: string
  idText: string
  title: string
  text: string
}

const Index = ({
  idTitle,
  idText,
  title,
  text,
}: AlertMessageProps) => {
  return (
    <div className="mb-3">
      <div className="m-1">
        <MainTitle id={idTitle} text={title} />
      </div>
      <div className="m-1">
        <MainText id={idText} text={text} />
      </div>
    </div>
  )
}

export default Index