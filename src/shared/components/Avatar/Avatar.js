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
