import './SignUp.css'

import React, { useEffect, useState } from 'react'
import { SubtitleWhite, SubtitleYellow, Title2White } from '../../shared/components/Label/Label'
import { InputPasswordLabelMd, InputTextLabelMd } from '../../shared/components/InputWithLabel/InputWithLabel'
import { ButtonComponent } from '../../shared/components/Button/Button'
import { ErrorForm } from '../../shared/components/ErrorForm/ErrorForm'
import { useNavigate } from 'react-router'
import { UseDep } from '../../shared/context/ContextDep'
import AppError from '../../utils/AppError'
import { PanicPopUpScreen, SuccessPopUpScreen } from '../../shared/components/PopUpScreen/PopUpScreen'
import { LoadingScreen } from '../../shared/components/LoadingScreen/LoadingScreen'

export const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const [isActive, setIsActive] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [verifyPasswordError, setVerifyPasswordError] = useState('');
    const navigate = useNavigate();
    const { authService } = UseDep();

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

    const checkConfirmPassword = () => {
        if (verifyPassword.length == 0) {
            setVerifyPasswordError('Cannot be empty')
        } else if (verifyPassword == password) {
            setVerifyPasswordError('')
        } else if (password != verifyPassword) {
            setVerifyPasswordError('Password missmatch')
        } else {
            setVerifyPasswordError('')
        }
    }

    const checkPassword = () => {
        if (password.length < 8) {
            setPasswordError('Minimal 8 character')
        }
    }

    useEffect(() => {
        if (username.length == 0 || email.length == 0 || password.length == 0 || verifyPassword.length == 0) {
            setIsActive(false)
            if (email.length == 0) {
                setEmailError('')
            }
            if (password.length == 0) {
                setPasswordError('')
            }
            if (verifyPassword.length == 0) {
                setVerifyPasswordError('')
            }
        } else if (emailError.length != 0 || passwordError.length != 0 || verifyPasswordError.length != 0) {
            setIsActive(false)
        } else {
            setIsActive(true)
        }

        if (verifyPassword) {
            checkConfirmPassword();
            if (verifyPassword == password) {
                setVerifyPasswordError('')
            }
        }

        if (password) {
            checkPassword();
            if (password.length >= 8) {
                setPasswordError('')
            }
        }
    }, [username, email, password, verifyPassword, emailError, passwordError, verifyPasswordError])



    const handleEmailChange = (event) => {
        setEmail(event.target.value)
        checkEmail(event.target.value)
    }
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const handleVerifyPasswordChange = (event) => {
        setVerifyPassword(event.target.value);
        checkConfirmPassword();
    }
    const handleSignUpClick = async () => {
        try {
            setLoading(true);
            const response = await authService.doRegister({
                user_name: username,
                email: email,
                password: password
            });
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
    const handleSignInClick = () => {
        navigate('/auth/login');
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

    return (
        <>
            <div className='sign-up-wrp'>
                <div className='sign-up-ctn'>
                    <Title2White title={'Sign Up'} />

                    <InputTextLabelMd handleOnChange={handleUsernameChange} id={'username'} label='Username' value={username} />

                    <InputTextLabelMd handleOnChange={handleEmailChange} id={'email'} label='E-mail' value={email} />
                    <ErrorForm message={emailError} />

                    <InputPasswordLabelMd handleOnChange={handlePasswordChange} id='password' label={'Password'} value={password} />
                    <ErrorForm message={passwordError} />

                    <InputPasswordLabelMd handleOnChange={handleVerifyPasswordChange} id='verifyPassword' label={'Confirm Password'} value={verifyPassword} />
                    <ErrorForm message={verifyPasswordError} />

                    <ButtonComponent isDisable={!isActive} label='Sign Up' onClick={handleSignUpClick} />


                    <div className='sign-in-ctn'>
                        <SubtitleYellow subtitle={`Have an account?`} />
                        <div className='pointer' onClick={handleSignInClick}>
                            <SubtitleWhite subtitle={'Sign In'} />
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
