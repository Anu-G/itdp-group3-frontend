import './NameLocation.css'

import React from 'react'
import { Title3White, TitleWhite } from '../Label/Label'

export const NameLocation = ({name, place}) => {
  return (
    <div className='name-location-ctn'>
        <TitleWhite title={name}/>
        <Title3White title={place}/>
    </div>
  )
}
