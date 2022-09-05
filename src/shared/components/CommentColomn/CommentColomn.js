import React, { useEffect, useState } from 'react'
import './CommentColomn.css'

export const CommentColomn = ({ placeholder, handleChange, value, maxLength, charLength, charLimitHandle }) => {

    const [highlight, setHighlight] = useState('');

    useEffect(() => {
        setHighlight(value.slice(maxLength + 1))

    }, [value])

    return (
        <div className='comment-wrp'>
            <div className='comment-box'>
                <textarea placeholder={placeholder} className='text-area' onChange={handleChange} value={value} onKeyDown={charLimitHandle} />
                <div className='char-length'>
                    {charLength}/{maxLength}
                </div>
            </div>
        </div>
    )
}
