import { useState } from 'react';
import { ButtonComponent } from '../../shared/components/Button/Button';
import { InputTextLabelLg, InputTextLabelMd } from '../../shared/components/InputWithLabel/InputWithLabel';
import { Title3White } from '../../shared/components/Label/Label';
import './SettingsAccount.css';
import { useForm } from 'react-hook-form';
import { ErrorForm } from '../../shared/components/ErrorForm/ErrorForm';
import { UseDep } from '../../shared/context/ContextDep';
import AppError from '../../utils/AppError';
import { AuthSelector } from '../../shared/selectors/Selectors';
import { useSelector } from 'react-redux'

export const SettingsAccount = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailError, setEmailError] = useState('');
    const { settingAccountService } = UseDep();
    const authRed = useSelector(AuthSelector)
    const checkEmail = (address) => {

        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        const mail = String(address)

        const result = mail.toLowerCase().match(re);

        if (!result) {
            setEmailError('E-mail is invalid!');
        } else {
            setEmailError('')
        }
    }

    const handleOnChangeUsername = (event) => {
        setUserName(event.target.value)
    }

    const handleOnChangeEmail = (event) => {
        setEmail(event.target.value)
        checkEmail(event.target.value)
    }

    const handleOnChangePhoneNumber = (event) => {
        setPhoneNumber(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await settingAccountService.doUpdate({
                "account_id":authRed.account_id,
                "user_name":userName,
                "email":email,
                "phone_number":phoneNumber
            })
            if (response.status === 200) {
                alert('success');
            }
        } catch (err) {
            AppError(err)
        }
    }

    return (
        <div className='wrapper'>
            <div className='settings-account-card'>
                <form onSubmit={handleSubmit}>
                    <div className='item'>
                        <InputTextLabelMd id={'userName'} label={'Username'} value={userName} handleOnChange={handleOnChangeUsername} />
                    </div>
                    <div className='item'>
                        <InputTextLabelMd id={'email'} label={'E-mail'} value={email} handleOnChange={handleOnChangeEmail} />
                        <ErrorForm message={emailError} />
                    </div >
                    <div className='item'>
                        <InputTextLabelMd id={'phoneNumber'} label={'Phone Number'} value={phoneNumber} handleOnChange={handleOnChangePhoneNumber} />
                    </div>

                    <div className='button-change'>
                        <ButtonComponent label={"Change"} />
                    </div>
                </form >
            </div >
        </div >
    )
}
