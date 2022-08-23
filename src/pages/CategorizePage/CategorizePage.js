import './CategorizePage.css'

import React, { useState } from 'react'
import { CategoryLabelActive, CategoryLabelInactive } from '../../shared/components/CategoryLabel/CategoryLabel'

export const CategorizePage = () => {

    const [isActive, setIsActive] = useState([true, false, false])

    const handleClick = (page) => {
        switch (page) {
            case 1:
                setIsActive([false, true, false])
                break;
            case 2:
                setIsActive([false, false, true])
                break;
            default:
                setIsActive([true, false, false])
                break;
        }
    }

  return (
    <div className='categorize-page'>
        <div className='category-label-btn-wrp'>
            <div className='category-label-btn' onClick={()=> handleClick(0)}>
                {isActive[0] ? <CategoryLabelActive label={'Post'}/> : <CategoryLabelInactive label={'Post'}/>}
            </div>
            <div className='category-label-btn' onClick={()=> handleClick(1)}>
                {isActive[1] ? <CategoryLabelActive label={'Catalog'}/> : <CategoryLabelInactive label={'Catalog'}/>}
            </div>
            <div className='category-label-btn' onClick={()=> handleClick(2)}>
                {isActive[2] ? <CategoryLabelActive label={'FAQ'}/> : <CategoryLabelInactive label={'FAQ'}/>}
            </div>
        </div>
        <div className='content-ctn'>
            
        </div>
    </div>
  )
}
