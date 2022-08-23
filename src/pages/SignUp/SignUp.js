import './SignUp.css'

import React, { useEffect, useState } from 'react'
import { SubtitleWhite, SubtitleYellow, Title2White } from '../../shared/components/Label/Label'
import { InputPasswordLabelMd, InputPasswordLabelSmTest, InputTextLabelMd } from '../../shared/components/InputWithLabel/InputWithLabel'
import { ButtonComponent } from '../../shared/components/Button/Button'
import { ErrorForm } from '../../shared/components/ErrorForm/ErrorForm'

export const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const [isActive, setIsActive] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [verifyPasswordError, setVerifyPasswordError] = useState('')

    const checkEmail = (address) => {

        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        const mail = String(address)

        const result = mail.toLowerCase().match(re);

        if (!result){
            setEmailError('E-mail is invalid!');
        } else {
            setEmailError('')
        }
    }

    const checkConfirmPassword = () => {
        if (verifyPassword.length == 0){
            setVerifyPasswordError('Cannot be empty')
        } else if (verifyPassword == password){
            setVerifyPasswordError('')
        }else if (password != verifyPassword){
            setVerifyPasswordError('Password missmatch')
        } else {
            setVerifyPasswordError('')
        }
    }

    useEffect(()=>{
        if (username.length==0 && email.length==0  && password.length==0  && verifyPassword.length==0 ){
            setIsActive(false)
            if(email.length == 0){
                setEmailError('')
            } 
            if (password.length == 0){
                setPasswordError('')
            }
            if (verifyPassword.length == 0){
                setVerifyPasswordError('')
            }
        } else if (emailError.length != 0 && password.length != 0 && verifyPassword.length != 0) {
            setIsActive(false)
        } else {
            setIsActive(true)
        }

        if(verifyPassword){
            checkConfirmPassword();
            if(verifyPassword == password){
                setVerifyPasswordError('')
            }
        }
    })

    

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
    const handleSignUpClick = () => {
        console.log('Ceritanya SignUp')
    }
    const handleSignInClick = () => {
        console.log('Ceritanya SignIn')
    }

  return (
    <div className='sign-up-wrp'>
        <div className='sign-up-ctn'>
            <Title2White title={'Sign Up'}/>

            <InputTextLabelMd handleOnChange={handleUsernameChange} id={'username'} label='Username' value={username}/>

            <InputTextLabelMd handleOnChange={handleEmailChange} id={'email'} label='E-mail' value={email}/>
            <ErrorForm message={emailError}/>

            <InputPasswordLabelMd handleOnChange={handlePasswordChange} id='password' label={'Password'} value={password}/>
            <ErrorForm message={passwordError}/>

            <InputPasswordLabelMd handleOnChange={handleVerifyPasswordChange} id='verifyPassword' label={'Confirm Password'} value={verifyPassword}/>
            <ErrorForm message={verifyPasswordError}/>

            <ButtonComponent isDisable={!isActive} label='Sign Up' onClick={handleSignUpClick}/>


            <div className='sign-in-ctn'>
                <SubtitleYellow subtitle={`Have an account?`}/>
                <div className='pointer' onClick={handleSignInClick}>
                    <SubtitleWhite subtitle={'Sign In'}/>
                </div>   
            </div>

        </div>
    </div>
  )
}