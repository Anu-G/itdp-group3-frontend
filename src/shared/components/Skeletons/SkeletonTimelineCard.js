import React from 'react'
import Shimmer from './Shimmer'
import SkeletonElement from './SkeletonElement'

const SkeletonTimelineCard = ({theme}) => {
  const themeClass = theme || 'light'

  return (
    <div className={`skeleton-wrapper ${themeClass}`}>
      <div className="skeleton-timeline">

        <div>
          <div className='profile-hd'>
            <SkeletonElement type="tl-avatar-small" />
              <div className='name-loc-ctn'>
                <SkeletonElement type="tl-name"/>
                <SkeletonElement type="tl-loc"/>
              </div>
          </div>

          <div className='option-btn'>
            <SkeletonElement type="tl-option-btn"/>
          </div>
        </div>

        <div className='caption-ctn'>
          <SkeletonElement type="tl-caption"/>
        </div>

        <>
        <div>
          <SkeletonElement type="tl-img-view"/>
        </div>
        </>

        <div className='bottom-ctn'>
          <div className='bottom-btn'>
            <SkeletonElement type="tl-comment-btn"/>
          </div>

          <div className='time-date'>
            <SkeletonElement type="tl-time-date"/>
          </div>

        </div>
      </div>
      <Shimmer />
    </div>
  )
}

export default SkeletonTimelineCard;