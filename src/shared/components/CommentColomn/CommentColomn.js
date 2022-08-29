import React, { useEffect, useRef, useState } from 'react'
import './CommentColomn.css'
import HighlightWithinTextarea from 'react-highlight-within-textarea'

export const CommentColomn = ({ placeholder, handleChange, value, maxLength, charLength, charLimitHandle }) => {

    const [highlight, setHighlight] = useState('');

    useEffect(() => {
        setHighlight(value.slice(maxLength + 1))

    }, [value])

    return (
        <div className='comment-wrp'>
            <div className='comment-box'>
                {/* <div className='comment-inside'>
                <HighlightWithinTextarea value={value} onChange={()=>{handleChange()}} highlight={highlight}/>

            </div> */}
                <textarea placeholder={placeholder} className='text-area' onChange={handleChange} value={value} onKeyDown={charLimitHandle} />
                <div className='char-length'>
                    {charLength}/{maxLength}
                </div>
            </div>
        </div>
    )
}
