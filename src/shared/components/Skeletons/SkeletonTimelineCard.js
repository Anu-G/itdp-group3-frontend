import React from 'react'
import Shimmer from './Shimmer'
import SkeletonElement from './SkeletonElement'

const SkeletonTimelineCard = ({ theme }) => {
  const themeClass = theme || 'light'

  return (
    <div className='timeline-wrp'>
      <div className='timeline-ctn' style={{ width: "692px" }}>
        <div>
          <div className='profile-hd'>
            <div className='avatar-ctn small'>
              <SkeletonElement type="profile-avatar" />
            </div>
            <div className='name-location-ctn'>
              <div className='name-location-ctn'>
                <SkeletonElement type="tl-name" />
                <SkeletonElement type="tl-loc" />
              </div>
            </div>
          </div>
        </div>
        <div className='caption-ctn'>
          <SkeletonElement type="tl-caption" />
          <SkeletonElement type="tl-caption-short" />
        </div>
        <>
          <div className='img-view-ctn'>
            <SkeletonElement type="tl-img-view" />
          </div>
        </>
      </div>
    </div>
  )
}

export default SkeletonTimelineCard;