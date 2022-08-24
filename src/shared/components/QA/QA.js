import './QA.css'

import React from 'react'
import { Text32White, Text32Yellow } from '../Label/Label'

export const QA = ({num, question, answer}) => {
    
  return (
    <div className='QA-wrp'>
        <div>
            <Text32Yellow text={`${num}. ${question}`}/>
        </div>
        <div className='answer-ctn'>
            <Text32White text={`${answer}`}/>
        </div>
    </div>
  )
}
