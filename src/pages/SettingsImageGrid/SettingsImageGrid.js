import React from 'react'
import { ImagesViewProfile } from '../../shared/components/ImagesViewProfile/ImagesViewProfile'
import './SettingsImageGrid.css'

export const SettingsImageGrid = ({links}) => {
  return (
    <>
        <div className='img-ctn'>
            {links.map(link => {
                return  <div>
                            <ImagesViewProfile link={link}/>
                        </div>
            })}
        </div>
    </>
  )
}
