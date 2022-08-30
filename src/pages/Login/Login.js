import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { ButtonComponent } from '../../shared/components/Button/Button'
import { ErrorForm } from '../../shared/components/ErrorForm/ErrorForm'
import { InputPasswordLabelSm, InputTextLabelSm } from '../../shared/components/InputWithLabel/InputWithLabel'
import { SubtitleWhite, SubtitleYellow, Title2White } from '../../shared/components/Label/Label'
import { LoadingScreen } from '../../shared/components/LoadingScreen/LoadingScreen'
import { PanicPopUpScreen, SuccessPopUpScreen } from '../../shared/components/PopUpScreen/PopUpScreen'
import { UseDep } from '../../shared/context/ContextDep'
import AppError from '../../utils/AppError'
import './Login.css'
import { UserLoginAction } from './state/AuthAction'

export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();
    const { authService } = UseDep();
    const dispatch = useDispatch();

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

    useEffect(() => {
        if (email.length == 0 || password.length == 0) {
            setIsActive(false);
            if (email.length == 0) {
                setEmailError('')
            }
            if (password.length == 0) {
                setPasswordError('')
            }
        } else if (emailError.length != 0 || passwordError.length != 0) {
            setIsActive(false)
        } else {
            setIsActive(true)
        }

        if (password) {
            checkPassword();
            if (password.length >= 8) {
                setPasswordError('')
            }
        }
    }, [email, password, emailError, passwordError])

    const handleOnChangeEmail = (event) => {
        setEmail(event.target.value)
        checkEmail(event.target.value)
    }

    const handleOnChangePass = (event) => {
        setPassword(event.target.value)
    }

    const handleLoginOnClick = async () => {
        try {
            setLoading(true);
            const response = await authService.doLogin({
                email: email,
                password: password
            });
            if (response.status === 200) {
                dispatch(UserLoginAction({
                    token: response.data.data
                }));
                setSuccess(true);
                navigate('/feeds');
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

    const handleForgotClick = () => {
        navigate('/forgot-password');
    }


    const handleSignUpClick = () => {
        navigate('/auth/register');
    }

    //id, label, handleOnChange, value,

    const onClickSuccess = (value) => {
        setSuccess(current => value);
    }

    const onClickPanic = (value) => {
        setPanic(prevState => ({
            ...prevState,
            isPanic: value, errMsg: ''
        }));
    }

    return (
        <>
            <div className='login-wrp'>
                <div className='login-ctn'>

                    <Title2White title={"Login"} />
                    <div className='login-form'>

                        <InputTextLabelSm id={'email'} label='E-mail' handleOnChange={handleOnChangeEmail} value={email} />
                        <ErrorForm message={emailError} />

                        <InputPasswordLabelSm id={'password'} label='Password' handleOnChange={handleOnChangePass} value={password} />
                        <ErrorForm message={passwordError} />
                        <ButtonComponent isDisable={!isActive} label='Login' onClick={handleLoginOnClick} />

                        <div className='sign-up2-ctn pointer' onClick={handleForgotClick}>
                            <SubtitleWhite subtitle={'Forgot Password?'} />
                        </div>

                    </div>

                    <div className='sign-up2-ctn'>
                        <SubtitleYellow subtitle={`Don't have an account?`} />

                        <div className='pointer' onClick={handleSignUpClick}>
                            <SubtitleWhite subtitle={'Sign Up'} />
                        </div>
                    </div>
                </div>
            </div>

            {isLoading && <LoadingScreen />}
            {success && <SuccessPopUpScreen onClickAnywhere={onClickSuccess} />}
            {panic.isPanic && <PanicPopUpScreen onClickAnywhere={onClickPanic} errMsg={panic.errMsg} />}
        </>
    )
}
