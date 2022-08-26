import React, { useState } from 'react'
import { CustomDropdown, CustomDropdownSm } from '../Dropdown/Dropdown';
import './CheckBox.css';

//used only in profile.
export const CheckBox = ({ label, items }) => {

    const [checked, setChecked] = useState(false)

    const handleOnChecked = () => {
        setChecked(!checked);
    }


    return (
        <div className={`custom-checkbox mt-2 ${checked ? "" : "custom-checkbox-inactive"}`}>
            
            <label>
                <div className='right-wrp'>
                    <input type={'checkbox'} onChange={handleOnChecked} />

                    <svg className={`checkbox ${checked ? "checkbox--active" : ""}`} aria-hidden="true" viewBox='0 2 15 6' fill='none'>
                        <path d="M2 4.5L6 9L13 0" strokeWidth="3" stroke={checked ? "#1E2329" : "#B9B9B9"} />
                    </svg>
                    <div className='label-dd'>
                        {label}

                    </div>

                </div>
                


            </label>
            <div className='dropdown-wrapper'>
                <CustomDropdownSm label={'Select One'} items={items} locked={!checked} />

                <span className='px-3'>to</span>

                <CustomDropdownSm label={'Select'} items={items} locked={!checked} />
            </div>
        </div>
    )
}

/*
not yet: when not clicked, the dropdown disabled.

checkbox resource
https://www.youtube.com/watch?v=2Sf8E9CUavA
*/