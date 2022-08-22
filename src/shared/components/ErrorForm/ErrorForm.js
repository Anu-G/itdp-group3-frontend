import './ErrorForm.css'

import React from 'react'

export const ErrorForm = ({message}) => {
  return (
    <div className='error-box'>{message}</div>
  )
}
