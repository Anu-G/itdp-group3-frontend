import './NameLocation.css'

import React from 'react'
import { Text32White, Title2White } from '../Label/Label'

export const NameLocation = ({ name, place = '', accId = '', accType, handleClick, profileStatus, isBusiness = false }) => {
  return (
    <div className='name-loc-business'>
      {isBusiness ? <img src={'/Business-Badge.svg'} style={{ height: '32px' }} /> : ''}

      <div className='name-location-ctn'>
        <div onClick={() => !profileStatus && handleClick(accId, accType)} style={profileStatus ? {} : { cursor: 'pointer' }}>
          <Title2White title={name} />
        </div>
        <Text32White text={place} />
      </div>
    </div>
  )
}
