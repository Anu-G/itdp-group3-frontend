import React, { useEffect, useState } from 'react'
import { ButtonComponent } from '../../shared/components/Button/Button'
import { ErrorForm } from '../../shared/components/ErrorForm/ErrorForm'
import { InputPasswordLabelSm, InputTextLabelSm } from '../../shared/components/InputWithLabel/InputWithLabel'
import { SubtitleWhite, SubtitleYellow, Title2White } from '../../shared/components/Label/Label'
import './Login.css'

export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('')

    const checkActive = () => {
        if (email.length ==0){
            setIsActive(false)
            setEmailError('')
        }
        if (password.length ==0){
            setIsActive(false)
            setPasswordError('')
        }
    }

    const checkEmail = (address) => {

        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        const mail = String(address)

        const result = mail.toLowerCase().match(re);
        console.log(result)

        if (!result){
            setEmailError('E-mail is invalid!');
        } else {
            setEmailError('')
        }
    }

    useEffect(checkActive, [email, password])

    const handleOnChangeEmail = (event) => {
        setEmail(event.target.value)
        checkEmail(event.target.value)
        checkActive()
    }

    const handleOnChangePass = (event) => {
        setPassword(event.target.value)
        checkActive()
    }

    const handleLoginOnClick = () => {
        console.log('ceritanya login');
    }

    const handleForgotClick = () => {
        console.log('ceritanya Forgot Password');
    }


    const handleSignUpClick = () => {
        console.log('ceritanya Sign Up');
    }

    //id, label, handleOnChange, value,

  return (
    <div className='login-wrp'>
        <div className='login-ctn'>
            <Title2White title={"Login"}/>
            <InputTextLabelSm id={'email'} label='E-mail' handleOnChange={handleOnChangeEmail} value={email}/>
            <ErrorForm message={emailError}/>

            <InputPasswordLabelSm id={'password'} label='Password' handleOnChange={handleOnChangePass} value={password}/>
            <ErrorForm message={passwordError}/>
            <ButtonComponent isDisable={!isActive} label='Login' onClick={handleLoginOnClick}/>
            
            <div className='sign-up2-ctn pointer' onClick={handleForgotClick}>
                <SubtitleWhite  subtitle={'Forgot Password?'}/>
            </div>
            <div className='sign-up2-ctn'>
                <SubtitleYellow subtitle={`Don't have an account?`}/>
                <div className='pointer' onClick={handleSignUpClick}>
                    <SubtitleWhite subtitle={'Sign Up'}/>
                </div>   
            </div>
        </div>
    </div>
    
  )
}
