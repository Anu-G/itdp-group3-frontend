import React, { useEffect, useRef, useState } from 'react'
import './CommentColomn.css'
import HighlightWithinTextarea from 'react-highlight-within-textarea'

export const CommentColomn = ({ label = '', handleChange, value, maxLength = 280 }) => {

    const [charLength, setCharLength] = useState(0);
    const [highlight, setHighlight] = useState('');

    useEffect(() => {
        setCharLength(value.length)

        setHighlight(value.slice(maxLength + 1))

    }, [value])

    return (
        <div className='comment-wrp'>
            <div className='comment-box'>
                {/* <div className='comment-inside'>
                <HighlightWithinTextarea value={value} onChange={()=>{handleChange()}} highlight={highlight}/>

            </div> */}
                <textarea placeholder='Write a comment...' className='text-area' onChange={handleChange} value={value} />
                <div className='char-length'>
                    {charLength}/{maxLength}
                </div>
            </div>
        </div>
    )
}
