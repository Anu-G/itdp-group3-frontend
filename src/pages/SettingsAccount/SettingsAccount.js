import { useEffect, useState } from 'react';
import { ButtonComponent } from '../../shared/components/Button/Button';
import { InputPasswordLabelMd, InputPasswordLabelSm, InputTextLabelLg, InputTextLabelMd } from '../../shared/components/InputWithLabel/InputWithLabel';
import { Title3White } from '../../shared/components/Label/Label';
import './SettingsAccount.css';
import { useForm } from 'react-hook-form';
import { ErrorForm } from '../../shared/components/ErrorForm/ErrorForm';
import { UseDep } from '../../shared/context/ContextDep';
import AppError from '../../utils/AppError';
import { AuthSelector } from '../../shared/selectors/Selectors';
import { useSelector } from 'react-redux'
import { LoadingScreen } from '../../shared/components/LoadingScreen/LoadingScreen';
import { PanicPopUpScreen, SuccessPopUpScreen } from '../../shared/components/PopUpScreen/PopUpScreen';

export const SettingsAccount = () => {
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailError, setEmailError] = useState('');
    const { settingAccountService } = UseDep();
    const authRed = useSelector(AuthSelector)

    const [isLoading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [panic, setPanic] = useState({ isPanic: false, errMsg: '' });

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

    const checkPassword = () => {
        if (password.length < 8) {
            setPasswordError('Minimal 8 character')
        }
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
            setLoading(true);
            const response = await settingAccountService.doUpdate({
                "account_id": authRed.account_id,
                "user_name": authRed.userName,
                "password": password,
                "email": email,
                "phone_number": phoneNumber
            })
            if (response.status === 200) {
                setSuccess(true);
            }
        } catch (err) {
            setPanic(prevState => ({
                ...prevState,
                isPanic: true, errMsg: AppError(err)
            }));
        } finally {
            setLoading(false);
        }
    }

    const onClickSuccess = (value) => {
        setSuccess(current => value);
    }

    const onClickPanic = (value) => {
        setPanic(prevState => ({
            ...prevState,
            isPanic: value, errMsg: ''
        }));
    }

    const handleOnChangePass = (event) => {
        setPassword(event.target.value)
    }

    useEffect(() => {
        if (email.length == 0 || password.length == 0) {
            if (email.length == 0) {
                setEmailError('')
            }
            if (password.length == 0) {
                setPasswordError('')
            }
        }

        if (password) {
            checkPassword();
            if (password.length >= 8) {
                setPasswordError('')
            }
        }
    }, [email, password, emailError, passwordError])

    return (
        <>
            <div className='wrapper'>
                <div className='settings-account-card'>
                    <form onSubmit={handleSubmit}>
                        <div className='item'>
                            <InputTextLabelMd id={'email'} label={'E-mail'} value={email} handleOnChange={handleOnChangeEmail} />
                            <ErrorForm message={emailError} />
                        </div >
                        <div className='item'>
                            <InputPasswordLabelMd id={'password'} label='Password' handleOnChange={handleOnChangePass} value={password} />
                            <ErrorForm message={passwordError} />
                        </div>
                        <div className='item'>
                            <InputTextLabelMd id={'phoneNumber'} label={'Phone Number'} value={phoneNumber} handleOnChange={handleOnChangePhoneNumber} />
                        </div>

                        <div className='button-change'>
                            <ButtonComponent label={"Change"} />
                        </div>
                    </form >
                </div >
            </div >

            {isLoading && <LoadingScreen />}
            {success && <SuccessPopUpScreen onClickAnywhere={onClickSuccess} />}
            {panic.isPanic && <PanicPopUpScreen onClickAnywhere={onClickPanic} errMsg={panic.errMsg} />}
        </>
    )
}
