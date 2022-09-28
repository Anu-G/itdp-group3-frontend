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
      <div className='title-3 white'>{`${title}`}</div>
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

export const Title2Green = ({title}) => {
    return(
        <div className='title-1 green'>{title}</div>
    )
}

export const Title2Red = ({title}) => {
    return(
        <div className='title-1 red'>{title}</div>
    )
}

export const Title2Yellow = ({title}) => {
    return(
        <div className='title-2 yellow'>{title}</div>
    )
}

export const Text32Yellow = ({text}) => {
    return (
        <div className='text32 yellow'>
            {text}
        </div>
    )
}

export const Text32White = ({text}) => {
    return (
        <div className='text32 white'>
            {text}
        </div>
    )
}

export const Title3Dark = ({title}) => {
    return (
        <div className='title-3 dark'>
            {title}
        </div>
    )
}

export const Text32Dark = ({text}) => {
    return (
        <div className='text32 dark'>
            {text}
        </div>
    )
}

export const Caption = ({text, readMore=false, handleReadmore}) => {

    const checkText = () => {
        if(text.length > 50){
            if(readMore){
                return
            }
        }
    }

    return <div className='caption white'>
        {readMore ? text.slice(0, 50) : text}
        <span onClick={handleReadmore} className='read-more'>
            {text.length > 50 ? !readMore ? " ...show less" : " ...show more" : ""}
        </span>
    </div>
}