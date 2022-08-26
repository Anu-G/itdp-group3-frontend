import React from 'react';
import { ButtonComponent } from '../../shared/components/Button/Button';
import { InputTextLabelLg } from '../../shared/components/InputWithLabel/InputWithLabel';
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
            <div className='username-button-change'>
                <div className='username-account'>
                    <Title3White title={"Username"} />
                    <InputTextLabelLg/>
                </div>
                <div className='button-change'>
                    <ButtonComponent label={"Change"}/>
                </div>
            </div>

            <div className='email'>
                <Title3White title={"Email"} />
                <InputTextLabelLg/>
            </div>

            <div className='phone-number'>
                <Title3White title={"Phone Number"} />
                <InputTextLabelLg/>
            </div>
            </form>
        </div>
    </div>
  )
}
