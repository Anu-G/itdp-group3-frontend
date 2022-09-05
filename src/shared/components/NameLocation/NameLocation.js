import './NameLocation.css'

import React from 'react'
import { Text32White, Title2White } from '../Label/Label'

export const NameLocation = ({ name, place = '' }) => {
  return (
    <div className='name-location-ctn'>
      <Title2White title={name} />
      <Text32White text={place} />
    </div>
  )
}
