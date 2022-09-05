import Lottie from "lottie-react";
import Happy from './Happy.json';
import Panic from './Sad.json';
import './PopUpScreen.css';
import React from 'react'
import { Text32Dark, Title3Dark } from "../Label/Label";
import OutsideClickHandler from 'react-outside-click-handler'

export const SuccessPopUpScreen = ({ onClickAnywhere }) => {



    return (
        <div className="loading-wrp">
            <OutsideClickHandler onOutsideClick={() => onClickAnywhere(false)}></OutsideClickHandler>
            <div className="pop-up-ctn pop-up-ctn-success">
                <Lottie animationData={Happy} loop={true} autoPlay={true} style={{ height: '80%' }} />
                <Title3Dark title={'Success!'} />
                <Text32Dark text={'Click Anywhere to continue...'} />
            </div>
        </div>
    )
}

export const PanicPopUpScreen = ({ onClickAnywhere, errMsg }) => {

    return (
        <div className="loading-wrp">
            <OutsideClickHandler onOutsideClick={() => onClickAnywhere(false)}></OutsideClickHandler>
            <div className="pop-up-ctn pop-up-ctn-panic">
                <Lottie animationData={Panic} loop={true} autoPlay={true} style={{ height: '70%' }} />
                <Title3Dark title={'Sorry. An error occured.'} />
                <Title3Dark title={errMsg} />
                <Text32Dark text={'Click Anywhere to continue...'} />

            </div>
        </div>
    )
}

export const SuccessPopUpScreenCustom = ({ onClickAnywhere, successMsg }) => {
    return (
        <div className="loading-wrp">
            <OutsideClickHandler onOutsideClick={() => onClickAnywhere(false)}></OutsideClickHandler>
            <div className="pop-up-ctn pop-up-ctn-success">
                <Lottie animationData={Happy} loop={true} autoPlay={true} style={{ height: '80%' }} />
                <Title3Dark title={'Success!'} />
                <Title3Dark title={successMsg} />
                <Text32Dark text={'Click Anywhere to continue...'} />
            </div>
        </div>
    )
}