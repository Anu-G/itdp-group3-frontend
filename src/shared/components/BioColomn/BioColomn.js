import React, { useState } from 'react'
import { Title3White } from '../Label/Label';
import './BioColomn.css'

export const BioColomn = ({label, maxLength = 150}) => {

    const [text, setText] = useState('');
    const [charLength, setCharLength] = useState(0);

    const handleChange = (event) =>{
        setText(event.target.value)
        console.log(event.target.value.length)
        setCharLength(event.target.value.length)
    }

  return (
    <div className='bio-wrp'>
        <Title3White title={label}/>
        <div className='bio-box'>
            <textarea className='text-area-bio' onChange={handleChange}/>
            <div className='char-length'>   
                {charLength}/{maxLength}
            </div>
        </div>
    </div>
  )
}
