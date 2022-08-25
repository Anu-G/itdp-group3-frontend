import Lottie from "react-lottie";
import loading from './LoadingAnimation.json';
import './LoadingScreen.css';

import React from 'react'
import { SubtitleWhite } from "../Label/Label";

export const LoadingScreen = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loading,
        rendererSettings: {
            preserveAspectRatio: "xMidYmid slice"
        }
    }
  return (
    <div className="loading-wrp">
        <div className="loading-ctn">
            <Lottie options={defaultOptions} style={{width:'100%', height:'100%'}}/>
           
        </div>
    </div>
  )
}
