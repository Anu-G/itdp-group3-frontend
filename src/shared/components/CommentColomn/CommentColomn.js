import React, { useState } from 'react'
import './CommentColomn.css'

export const CommentColomn = () => {

    const [text, setText] = useState('');
    const maxLength = 100;
    const [charLength, setCharLength] = useState(0);

    const handleChange = (event) =>{
        setText(event.target.value)
        console.log(event.target.value.length)
        setCharLength(event.target.value.length)
    }

  return (
    <div className='comment-wrp'>
        CommentColomn
        <div className='comment-box'>
            <textarea className='text-area' onChange={handleChange}/>
            <div className='char-length'>   
                {charLength}/{maxLength}
            </div>
        </div>
    </div>
  )
}
