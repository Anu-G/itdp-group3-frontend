import './NameLocation.css'

import React from 'react'
import { Text32White, Title2White } from '../Label/Label'

export const NameLocation = ({ name, place = '', accId = '', handleClick }) => {
  return (
    <div className='name-location-ctn'>
      <div onClick={() => handleClick(accId)} style={{ cursor: 'pointer' }}>
        <Title2White title={name} />
      </div>
      <Text32White text={place} />
    </div>
  )
}
