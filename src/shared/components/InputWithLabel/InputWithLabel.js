import "./InputWithLabel.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye as EyeRegular } from "@fortawesome/free-regular-svg-icons";
import { faEye as EyeSolid } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


export const InputTextLabelSm = ({ id, label, handleOnChange, value, style }) => (
   <div className="input-class input-sm" style={style}>
      <input className="input-area" type={"text"} id={id} onChange={handleOnChange} value={value} />
      <label className="input-label" htmlFor={id}>{label}</label>
   </div>
);

export const InputTextLabelMd = ({ id, label, handleOnChange, value }) => (
   <div className="input-class input-md">
      <input className="input-area" type={"text"} id={id} onChange={handleOnChange} value={value} />
      <label className="input-label" htmlFor={id}>{label}</label>
   </div>
);

export const InputTextLabelLg = ({ id, label, handleOnChange, value }) => (
   <div className="input-class input-lg">
      <input className="input-area" type={"text"} id={id} onChange={handleOnChange} value={value} />
      <label className="input-label" htmlFor={id}>{label}</label>
   </div>
);

export const InputPasswordLabelSm = ({ id, label, handleOnChange, value, }) => {
   const [showIcon, setShowIcon] = useState(false);
   const handleShowIcon = () => {
      setShowIcon(!showIcon)
   }
   return (
      <div className="input-class input-sm">
         <div className="icon-eye" onClick={handleShowIcon}>
            {showIcon ? <FontAwesomeIcon icon={EyeSolid} /> :
               <FontAwesomeIcon icon={EyeRegular} />}
         </div>
         <input className="input-area" type={showIcon ? "text" : "password"} id={id} onChange={handleOnChange} value={value} />
         <label className="input-label" htmlFor={id}>{label}</label>
      </div>
   );
}

export const InputPasswordLabelMd = ({ id, label, handleOnChange, value, }) => {
   const [showIcon, setShowIcon] = useState(false);
   const handleShowIcon = () => {
      setShowIcon(!showIcon)
   }
   return (
      <div className="input-class input-md">
         <div className="icon-eye" onClick={handleShowIcon}>
            {showIcon ? <FontAwesomeIcon icon={EyeSolid} /> :
               <FontAwesomeIcon icon={EyeRegular} />}
         </div>
         <input className="input-area" type={showIcon ? "text" : "password"} id={id} onChange={handleOnChange} value={value} />
         <label className="input-label" htmlFor={id}>{label}</label>
      </div>
   );
}

export const InputOnly = ({ id, label, handleOnChange, value, style }) => (
   <div className="input-class-src" style={style}>
      <input className="input-area srch" placeholder={label} type={"text"} id={id} onChange={handleOnChange} value={value} />
   </div>
);