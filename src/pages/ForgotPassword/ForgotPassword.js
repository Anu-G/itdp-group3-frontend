import './ForgotPassword.css'

import React, { useEffect, useState } from 'react'
import { SubtitleWhite, SubtitleYellow, Title2White } from '../../shared/components/Label/Label'
import { InputTextLabelSm } from '../../shared/components/InputWithLabel/InputWithLabel'
import { ButtonComponent } from '../../shared/components/Button/Button'
import { ErrorForm } from '../../shared/components/ErrorForm/ErrorForm'

export const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [isActive, setIsActive] = useState(false)
    const [error, setError] = useState('')

    const checkEmail = (address) => {

        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        const mail = String(address)

        const result = mail.toLowerCase().match(re);
        console.log(result)

        if (!result){
            setError('E-mail is invalid!');
        } else {
            setError('')
        }
    }

    useEffect(()=>{
        if (email.length==0){
            setIsActive(false)
            setError('')
        } else if (error) {
            setIsActive(false)
        } else {
            setIsActive(true)
        }
    }, [email])

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        checkEmail(event.target.value);
        
    }

    const handleClick = () => {
        console.log('ceritanya send reset link')
    }
  return (
    <div className='wrp'>
        <div className='ctn'>
            <Title2White title={'Forgot Password'}/>
            <InputTextLabelSm handleOnChange={handleEmailChange} id='email' label={'E-mail'} value={email}/>
            
            <ErrorForm message={error}/>

            <ButtonComponent isDisable={!isActive} label='Send reset Link' onClick={handleClick}/>

            <div className='sign-in-ctn'>
                <SubtitleYellow subtitle={`Have an account?`}/>
                <div className='pointer'>
                    <SubtitleWhite subtitle={'Sign In'}/>
                </div>   
            </div>
        </div>
    </div>
  )
}
