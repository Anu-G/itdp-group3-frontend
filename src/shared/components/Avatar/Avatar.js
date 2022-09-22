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

export const AvatarSmall = ({ link, accId, handleClick, profileStatus }) => {
  return (
    <>
      <div className={profileStatus ? 'avatar-ctn small-inactive' : 'avatar-ctn small'} onClick={() => !profileStatus && handleClick(accId)}>
        <img className='avatar-profile' src={link} />
      </div>
    </>
  )
}
