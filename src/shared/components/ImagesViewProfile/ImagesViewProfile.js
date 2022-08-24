import './ImagesViewProfile.css'

import React from 'react'

export const ImagesViewProfile = ({link}) => {
  return (
    <div>
        <div className='img-vw-ctn'>
            <img className='img-vw-profile' src={link}/>
        </div>
    </div>
  )
}

export const ImagesViewTimeline = ({link}) => {
    return (
      <div>
          <div className='img-tl-ctn'>
              <img className='img-vw-profile' src={link}/>
          </div>
      </div>
    )
  }
