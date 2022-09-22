import { CustomDropdownSm } from '../Dropdown/Dropdown';
import './CheckBox.css';
import { animated, useSpring } from 'react-spring';

//used only in profile.
export const CheckBox = ({ label, items, valueCB, onChangeCB, handleChangeStart, handleChangeEnd, openHourStart, closeHourStart }) => {

    const checkBoxAnimationStyle = useSpring({
        opacity: valueCB ? "1" : '0.5'
    })

    return (
        <div
            className={`custom-checkbox mt-2 ${valueCB ? "" : "custom-checkbox-inactive"}`}>

            <label>
                <div className='right-wrp'>
                    <input type={'checkbox'} onChange={onChangeCB} />

                    <svg className={`checkbox ${valueCB ? "checkbox--active" : ""}`} aria-hidden="true" viewBox='0 2 15 6' fill='none'>
                        <path d="M2 4.5L6 9L13 0" strokeWidth="3" stroke={valueCB ? "#1E2329" : "#B9B9B9"} />
                    </svg>
                    <div className='label-dd'>
                        {label}

                    </div>

                </div>



            </label>
            <div className='dropdown-wrapper'>
                {openHourStart && <CustomDropdownSm label={openHourStart} items={items} locked={!valueCB} handleChange={handleChangeStart} />}
                {!openHourStart && <CustomDropdownSm label={'Select'} items={items} locked={!valueCB} handleChange={handleChangeStart} />}

                <span className='px-3'>to</span>

                {closeHourStart && <CustomDropdownSm label={closeHourStart} items={items} locked={!valueCB} handleChange={handleChangeEnd} />}
                {!closeHourStart && <CustomDropdownSm label={'Select'} items={items} locked={!valueCB} handleChange={handleChangeEnd} />}
            </div>
        </div>
    )
}

/*
not yet: when not clicked, the dropdown disabled.

checkbox resource
https://www.youtube.com/watch?v=2Sf8E9CUavA
*/