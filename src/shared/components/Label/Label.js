import React from 'react'
import './Label.css'

export const Title2White = ({title}) => {
  return (
    <div className='title-2 white'>{title}</div>
  )
}

export const TitleWhite = ({title}) => {
    return (
      <div className='title-1 white'>{title}</div>
    )
}

export const Title2Blue = ({title}) => {
    return (
      <div className='title-2 blue'>{title}</div>
    )
}

export const Title3White = ({title}) => {
    return (
      <div className='title-3 white'>{title}</div>
    )
  }

export const SubtitleWhite = ({subtitle}) => {
    return(
        <div className='subtitle white'>{subtitle}</div>
    )
}

export const SubtitleYellow = ({subtitle}) => {
    return(
        <div className='subtitle yellow'>{subtitle}</div>
    )
}
