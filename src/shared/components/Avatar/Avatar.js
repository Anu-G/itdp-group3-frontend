import React from 'react'
import './Avatar.css'

export const Avatar = ({link}) => {
  return (
    <>
        <div className='avatar-ctn'>
            <img className='avatar-profile' src={link}/>
        </div>
    </>
  )
}

export const AvatarSmall = ({link, accId, handleClick}) => {
  return (
    <>
        <div className='avatar-ctn small' onClick={()=>handleClick(accId)}>
            <img className='avatar-profile' src={link}/>
        </div>
    </>
  )
}
