import React, { useState } from 'react'
import { CustomDropdown } from '../Dropdown/Dropdown';
import './CheckBox.css';

//used only in profile.
export const CheckBox = () => {

    const [checked, setChecked] = useState(false)

    const handleOnChecked = () => {
        setChecked(!checked);
    }


  return (
    <div className={`custom-checkbox ${checked ? "" : "custom-checkbox-inactive"}`}>
        <label>
            <input type={'checkbox'} onChange={handleOnChecked}/>

            <svg className={`checkbox ${checked ? "checkbox--active" : ""}`} aria-hidden="true" viewBox='0 2 15 6' fill='none'>
                <path d="M2 4.5L6 9L13 0" strokeWidth="3" stroke={checked ? "#1E2329" : "#B9B9B9"} />
            </svg>
            Sunday 
            

        </label>
        <CustomDropdown label={'Select One'} items={["item 1", "item 2", "item 3", "item 4", "item 5"]} locked={!checked}/>
            
        to

        <CustomDropdown label={'Select One'} items={["item 1", "item 2", "item 3", "item 4", "item 5"]} locked={!checked}/>
    </div>
  )
}

/*
not yet: when not clicked, the dropdown disabled.

checkbox resource
https://www.youtube.com/watch?v=2Sf8E9CUavA
*/