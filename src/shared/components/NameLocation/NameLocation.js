import './NameLocation.css'

import React from 'react'
import { Title2White, Title3White, TitleWhite } from '../Label/Label'

export const NameLocation = ({name, place}) => {
  return (
    <div className='name-location-ctn'>
        <Title2White title={name}/>
        <Title3White title={place}/>
    </div>
  )
}
