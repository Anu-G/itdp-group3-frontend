import React from 'react'
import './Dropdown.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(fas)

//propsnya itu list yang bakal jadi dropdown itemnya.
// <CustomDropdown label={'Select One'} items={["item 1", "item 2", "item 3", "item 4", "item 5"]}/> 
export const CustomDropdown = ({label, items, locked}) => {
    const [value, setValue] = useState(label);
    const [active, setActive] = useState(false)

    const handleClick = (value) => {
        setValue(value)
    }

    const handleDropdownActive = () => {
        if (!locked) {
            setActive((prevActive) => !prevActive);
        }
    }


  return (
    <div>


        <div className='dropdown-wrp'>
            <div className='dropdown-btn' onClick={()=>{handleDropdownActive()}}>
                {value}
                <div>
                    <FontAwesomeIcon icon="fa-solid fa-angle-down" className='icon' />
                </div>
                
            </div>
            {
                active && 
                <div className='dropdown-ctn'>
                    {items.map((item)=>{
                        return(
                            <div onClick={()=> handleClick(item)}>{item}</div>
                        )
                    })}
                </div>
                }
            

        </div>
    </div>
  )
}


/*
style={{
                width: '280px', 
                height: '60px',
                borderRadius: '20px',
                background: '#849EB9',
                fontSize: '34px'}}

resource: 
https://youtu.be/n_VdjuKvQ_Y
*/