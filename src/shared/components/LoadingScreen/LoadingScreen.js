import Lottie from "lottie-react";
import loading from './LoadingAnimation.json';
import './LoadingScreen.css';

import React from 'react'
import { SubtitleWhite } from "../Label/Label";

export const LoadingScreen = () => {
    return (
        <div className="loading-wrp">
            <div className="loading-ctn">
                <Lottie animationData={loading} loop={true} autoPlay={true} style={{ width: '100%', height: '100%' }} />

            </div>
        </div>
    )
}

export const LoadingScreenSm = _ => {
    return (
        <div className="loading-wrp-sm">
            <div className="loading-ctn-sm">
                <Lottie animationData={loading} loop={true} autoPlay={true} style={{ width: '100%', height: '100%' }} />

            </div>
        </div>
    )
}
