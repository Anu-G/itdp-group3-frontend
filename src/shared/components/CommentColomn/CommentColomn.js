import React, { useEffect, useState } from 'react'
import './CommentColomn.css'

export const CommentColomn = ({ placeholder, handleChange, value, maxLength, charLength, charLimitHandle }) => {

    const [highlight, setHighlight] = useState('');

    useEffect(() => {
        setHighlight(value.slice(maxLength + 1))
    }, [value])

    const handleOnChange = (e) => {
        if (e.target.value.length <= maxLength) {
            handleChange(e)           
        }
    }

    return (
        <div className='comment-wrp'>
            <div className='comment-box'>
                <textarea placeholder={placeholder} className='text-area' onChange={handleOnChange} value={value} onKeyDown={charLimitHandle} />
                <div className='char-length'>
                    {charLength}/{maxLength}
                </div>
            </div>
        </div>
    )
}
