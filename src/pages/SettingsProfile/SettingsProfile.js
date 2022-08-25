import { Button } from 'bootstrap';
import React, { useState, useForm } from 'react';
import { BioColomn } from '../../shared/components/BioColomn/BioColomn';
import { ButtonComponent } from '../../shared/components/Button/Button';
import { CheckBox } from '../../shared/components/CheckBox/CheckBox';
import { CommentColomn } from '../../shared/components/CommentColomn/CommentColomn';
import { CustomDropdown } from '../../shared/components/Dropdown/Dropdown';
import { InputTextLabelLg } from '../../shared/components/InputWithLabel/InputWithLabel';
import { Title2White, Title3White } from '../../shared/components/Label/Label';
import './SettingsProfile.css';

export const SettingsProfile = () => {
    // const{selectedCategory, setSelectedCategory} = useState("Food & Beverage");
    // const { editProfile, handleSubmit } = useForm();
    // const onSubmit = (data, e) => console.log(data, e);
    // const onError = (errors, e) => console.log(errors, e);

  return (
     <div className='wrapper'>
        {/* <form onSubmit={handleSubmit(onSubmit, onError)}> */}
            <div className='settings-profile-card'>
                <div className='profile-bio'>
                    <div className='profile-card'>
                        <img src=''/>
                    </div>
                    <div className='bio'>
                        <Title2White title={"Free Coffee"}/><br/>
                        <BioColomn/>
                    </div>
                </div>

                <div className='settings-category'>
                    <Title3White title={"Category:"}/>
                    {/* <CustomDropdown className='custom-dropdown' value={selectedCategory} onChange={()=>setSelectedCategory()}> */}
                    <span>
                    <CustomDropdown label='Food & Beverage'/>
                    </span>
                </div>

                <div className='open-hours'>
                    <Title3White title={"Open Hours:"}/>
                    <div className='open-hours-day'>
                        <CheckBox/>
                        <CheckBox/>
                        <CheckBox/>
                        <CheckBox/>
                        <CheckBox/>
                        <CheckBox/>
                        <CheckBox/>
                    </div>
                </div>

                <div className='address-link-gmaps'>
                    <div className='address-left'>
                        <Title3White title={"Address: "}/>
                        <textarea className='textarea-address'/>
                        <Title3White title={"Google Maps Link"}/>
                        <InputTextLabelLg/>
                    </div>
                    <div className='address-right'>
                        <div className='shopee-link'>
                        <Title3White title={"Shopee Link"}/>
                        <InputTextLabelLg/>
                        </div>
                        <div className='tokopedia-link'>
                        <Title3White title={"Tokopedia Link"}/>
                        <InputTextLabelLg/>
                        </div>
                    </div>
                    
                </div>

                <div className='button-save'>
                    <ButtonComponent label={"Save"}/>
                </div>
            </div>
        {/* </form> */}
    </div> 
  )
  }