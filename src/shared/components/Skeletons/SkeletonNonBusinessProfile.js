import React from 'react'
import Shimmer from './Shimmer'
import SkeletonElement from './SkeletonElement'

const SkeletonNonBusinessProfile = ({theme}) => {
  const themeClass = theme || 'light'

  return (
    <div className={`skeleton-wrapper ${themeClass}`}>
      <div className="skeleton-profile">

      <div className='profile-page'>
            <div className='top-profile'>
               <div className='head-profile-left'>
                  <div className='head-profile'>

                        <div className='avatar-container'>
                            <SkeletonElement type="profile-avatar"/>
                        </div>

                     <div className='profile-text-item'>
                        <div className='profile-text-head'>
                            <SkeletonElement type="profile-display-name"/>
                        </div>
                     </div>
                  </div>
                  <div style={{ maxWidth: '736px' }}>
                    <SkeletonElement type="profile-bio"/>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <Shimmer />
    </div>
  )
}

export default SkeletonNonBusinessProfile;