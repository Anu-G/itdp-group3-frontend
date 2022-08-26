import React from 'react';
import { ButtonComponent, ButtonComponentSm } from '../../shared/components/Button/Button';
import { InputTextLabelLg, InputTextLabelMd } from '../../shared/components/InputWithLabel/InputWithLabel';
import { Title3White } from '../../shared/components/Label/Label';
import './SettingsAccount.css';
import { useForm } from 'react-hook-form';

export const SettingsAccount = () => {
    const {changeAccount, handleSubmit} = useForm();
    const onSubmit=(data,e)=> console.log(data, e);
    const onError = (errors, e) => console.log(errors, e);
  return (
    <div className='wrapper'>
        <div className='settings-account-card'>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <div className='item'>
                    <InputTextLabelMd label={'Username'}/>
                </div>

                <div className='item'>
                    <InputTextLabelMd label={'Email'}/>
                </div >

                <div className='item'>
                    <InputTextLabelMd label={'Phone Number'}/>
                </div>
                <div className='button-change'>
                    <ButtonComponent label={"Change"}/>
                </div>
            </form>
        </div>
    </div>
  )
}
