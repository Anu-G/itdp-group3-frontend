import React from 'react';
import './CategoryLabel.css';

export const CategoryLabelActive = ({label}) => {
  return (
    <>
        <div className='category-label'>
            <div className='label'>
                {label}
            </div>
        </div>
    </>
    
  )
}

export const CategoryLabelInactive = ({label}) => {
  return (
    <>
    <div className='category-label inactive'>
        <div className='label'>
            {label}
        </div>
    </div>
    </>
  )
}

