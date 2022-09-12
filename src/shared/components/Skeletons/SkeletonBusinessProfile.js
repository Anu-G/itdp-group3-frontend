import React from 'react'
import Shimmer from './Shimmer'
import SkeletonElement from './SkeletonElement'

const SkeletonBusinessProfile = ({theme}) => {
  const themeClass = theme || 'light'

  return (
    <div className={`skeleton-wrapper ${themeClass}`}>
      <div className="skeleton-profile">

        <div className='top-profile'>
          <div className='head-profile-left'>
              <div className='head-profile'>
                <div className='avatar-container'>
                  <SkeletonElement type="profile-avatar"/>
                </div>

                  <div className='profile-text-item'>
                      <div className='profile-text-head'>
                        <SkeletonElement type="profile-display-name"/>
                        <SkeletonElement type="profile-isopen"/>
                      </div>
                      <SkeletonElement type="profile-category-name"/>
                      <div className='open-hour'>
                          <SkeletonElement type="profile-today-open-hour"/>
                          <SkeletonElement type="profile-openn-close-hour"/>
                      </div>
                  </div>
              </div>
              <div style={{ maxWidth: '736px' }}>
                  <SkeletonElement type="profile-bio"/>
              </div>
          </div>
          <div className='profile-buttons'>
              <SkeletonElement type="button-sm"/>
              <SkeletonElement type="button-sm"/>
              <SkeletonElement type="button-sm"/>
          </div>
        </div>
      </div>
      <Shimmer />
    </div>
  )
}

export default SkeletonBusinessProfile;