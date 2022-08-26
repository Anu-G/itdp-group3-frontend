import React, { useEffect, useState } from 'react'
import './CommentColomn.css'

export const CommentColomn = ({label='',handleChange, value, maxLength=280}) => {

    const [charLength, setCharLength] = useState(0);

    useEffect(() => {
        setCharLength(value.length)
    },[value])

  return (
    <div className='comment-wrp'>
        <div className='comment-box'>
            <textarea className='text-area' onChange={handleChange} value={value}/>
            <div className='char-length'>   
                {charLength}/{maxLength}
            </div>
        </div>
    </div>
  )
}
