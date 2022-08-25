import React, { useState } from 'react'
import { Title3White } from '../Label/Label';
import './BioColomn.css'

export const BioColomn = () => {

    const [text, setText] = useState('');
    const maxLength = 150;
    const [charLength, setCharLength] = useState(0);

    const handleChange = (event) =>{
        setText(event.target.value)
        console.log(event.target.value.length)
        setCharLength(event.target.value.length)
    }

  return (
    <div className='comment-wrp'>
        <Title3White title={"Bio:"}/>
        <div className='comment-box'>
            <textarea className='text-area' onChange={handleChange}/>
            <div className='char-length'>   
                {charLength}/{maxLength}
            </div>
        </div>
    </div>
  )
}
