import React from 'react'
import SkeletonElement from '../Skeletons/SkeletonElement'
import './Avatar.css'

export const Avatar = ({ link, isLoading }) => {
  return (
    <>
      <div className='avatar-ctn'>
        {isLoading ? <SkeletonElement type="profile-avatar" /> : <img className='avatar-profile' src={link} />}
      </div>
    </>
  )
}

export const AvatarSmall = ({ link, accId, handleClick }) => {
  return (
    <>
      <div className='avatar-ctn small' onClick={() => handleClick(accId)}>
        <img className='avatar-profile' src={link} />
      </div>
    </>
  )
}
