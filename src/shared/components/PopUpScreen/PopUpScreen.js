import Lottie from "lottie-react";
import Happy from './Happy.json';
import Panic from './Sad.json';
import './PopUpScreen.css';
import React, { useState } from 'react'
import { SubtitleWhite, Text32Dark, Title3Dark, Title3White } from "../Label/Label";
import OutsideClickHandler from 'react-outside-click-handler'

export const SuccessPopUpScreen = () => {

    const [hidden, setHidden] = useState(true)

    return (
        <div className="loading-wrp">
            <OutsideClickHandler onOutsideClick={()=> setHidden(false)}></OutsideClickHandler>
            <div className="pop-up-ctn">
                <Lottie animationData={Happy} loop={true} autoPlay={true} style={{ height: '80%' }} />
                <Title3Dark title={'Success!'}/>
                <Text32Dark text={'Click Anywhere to continue...'}/>
            </div>
        </div>
    )
}

export const PanicPopUpScreen = () => {
    const [hidden, setHidden] = useState(true)
    return (
        <div className="loading-wrp">
            <OutsideClickHandler onOutsideClick={()=> setHidden(false)}></OutsideClickHandler>
            <div className="pop-up-ctn">
                <Lottie animationData={Panic} loop={true} autoPlay={true} style={{ height: '80%' }} />
                <Title3Dark title={'Sorry. An error occured.'}/>
                <Text32Dark text={'Click Anywhere to continue...'}/>

            </div>
        </div>
    )
}

