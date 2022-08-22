import './SignUp.css'

import React, { useState } from 'react'
import { SubtitleWhite, SubtitleYellow, Title2White } from '../../shared/components/Label/Label'
import { InputPasswordLabelMd, InputTextLabelMd } from '../../shared/components/InputWithLabel/InputWithLabel'
import { ButtonComponent } from '../../shared/components/Button/Button'

export const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const [isActive, setActive] = useState(false)

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const handleVerifyPasswordChange = (event) => {
        setVerifyPassword(event.target.value)
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

            <InputTextLabelMd handleOnChange={handleEmailChange} id={'email'} label='e-mail' value={email}/>

            <InputPasswordLabelMd handleOnChange={handlePasswordChange} id='password' label={'Password'} value={password}/>

            <InputPasswordLabelMd handleOnChange={handleVerifyPasswordChange} id='rePassword' label={'Confirm Password'} value={verifyPassword}/>

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
