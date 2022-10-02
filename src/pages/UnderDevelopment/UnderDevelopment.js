import React from 'react'
import { Text32White, Title2White } from '../../shared/components/Label/Label'
import './UnderDevelopment.css'

export const UnderDevelopment = () => {
  return (
    <div className='under-dev-wrp'>
        <div className='img-ctn'>
            <img src={'/under-development.png'} style={{height: '500px'}} />
        </div>
        <div className='under-dev-text'>
            <div className='ttle'>
                <Title2White title={'This page is under construction'}/>
            </div>
            <div className='text'>
                <Text32White text={'We are working on it!'}/>
            </div>
        </div>
    </div>
  )
}
