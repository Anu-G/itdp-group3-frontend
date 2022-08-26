import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { ButtonComponent } from '../../shared/components/Button/Button'
import { ErrorForm } from '../../shared/components/ErrorForm/ErrorForm'
import { InputPasswordLabelSm, InputTextLabelSm } from '../../shared/components/InputWithLabel/InputWithLabel'
import { SubtitleWhite, SubtitleYellow, Title2White } from '../../shared/components/Label/Label'
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
            const response = await authService.doLogin({
                email: email,
                password: password
            });
            if (response.status === 200) {
                dispatch(UserLoginAction({
                    token: response.data.data
                }))
                navigate('/feeds');
            }
        } catch (err) {
            AppError(err);
        }
    }

    const handleForgotClick = () => {
        navigate('/forgot-password');
    }


    const handleSignUpClick = () => {
        navigate('/auth/register');
    }

    //id, label, handleOnChange, value,

    return (
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

    )
}
