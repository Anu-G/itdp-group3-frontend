import React, { useEffect, useState } from 'react'
import { ButtonComponent } from '../../shared/components/Button/Button'
import { InputPasswordLabelMd, InputPasswordLabelSm, InputTextLabelSm } from '../../shared/components/InputWithLabel/InputWithLabel'
import { SubtitleWhite, SubtitleYellow, Title2White } from '../../shared/components/Label/Label'
import './Login.css'

export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false);

    const checkActive = () => {
        if (email.length ==0){
            setIsActive(false)
        }
        if (password.length ==0){
            setIsActive(false)
        }
        if(email && password){
            setIsActive(true)
        }
    }

    useEffect(checkActive, [email, password])

    const handleOnChangeEmail = (event) => {
        setEmail(event.target.value)
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
            <InputPasswordLabelSm id={'password'} label='Password' handleOnChange={handleOnChangePass} value={password}/>
            <ButtonComponent isDisable={!isActive} label='Login' onClick={handleLoginOnClick}/>
            
            <div className='sign-up-ctn pointer' onClick={handleForgotClick}>
                <SubtitleWhite  subtitle={'Forgot Password?'}/>
            </div>
            <div className='sign-up-ctn'>
                <SubtitleYellow subtitle={`Don't have an account?`}/>
                <div className='pointer' onClick={handleSignUpClick}>
                    <SubtitleWhite subtitle={'Sign Up'}/>
                </div>   
            </div>
        </div>
    </div>
    
  )
}
