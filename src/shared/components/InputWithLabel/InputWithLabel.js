import "./InputWithLabel.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye as EyeRegular } from "@fortawesome/free-regular-svg-icons";
import { faEye as EyeSolid } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";


export const InputTextLabelSm = ({ id, label, handleOnChange, value }) => (
   <div className="input-class input-sm">
      <input className="input-area" type={"text"} id={id} onChange={handleOnChange} value={value} />
      <label className="input-label" for={id}>{label}</label>
   </div>
);

export const InputTextLabelMd = ({ id, label, handleOnChange, value }) => (
   <div className="input-class input-md">
      <input className="input-area" type={"text"} id={id} onChange={handleOnChange} value={value} />
      <label className="input-label" for={id}>{label}</label>
   </div>
);

export const InputTextLabelLg = ({ id, label, handleOnChange, value }) => (
   <div className="input-class input-lg">
      <input className="input-area" type={"text"} id={id} onChange={handleOnChange} value={value} />
      <label className="input-label" for={id}>{label}</label>
   </div>
);

export const InputPasswordLabelMd = ({ id, label, handleOnChange, value, }) => {
   const [showIcon, setShowIcon] = useState(false);
   let passwordArea = undefined;
   useEffect(_ => {
      passwordArea = document.querySelector(`#${id}`);
   }, [showIcon]);
   return (
      <div className="input-class input-md">
         <div className="icon-eye">
            {showIcon ? <FontAwesomeIcon icon={EyeSolid} onClick={_ => showPass(passwordArea, showIcon, setShowIcon)} /> :
               <FontAwesomeIcon icon={EyeRegular} onClick={_ => showPass(passwordArea, showIcon, setShowIcon)} />}
         </div>
         <input className="input-area" type={"password"} id={id} onChange={handleOnChange} value={value} />
         <label className="input-label" for={id}>{label}</label>
      </div>
   );
}

export const InputPasswordLabelSm = ({ id, label, handleOnChange, value, }) => {
   const [showIcon, setShowIcon] = useState(false);
   let passwordArea = undefined;
   useEffect(_ => {
      passwordArea = document.querySelector(`#${id}`);
   }, [showIcon]);
   return (
      <div className="input-class input-sm">
         <div className="icon-eye">
            {showIcon ? <FontAwesomeIcon icon={EyeSolid} onClick={_ => showPass(passwordArea, showIcon, setShowIcon)} /> :
               <FontAwesomeIcon icon={EyeRegular} onClick={_ => showPass(passwordArea, showIcon, setShowIcon)} />}
         </div>
         <input className="input-area" type={"password"} id={id} onChange={handleOnChange} value={value} />
         <label className="input-label" for={id}>{label}</label>
      </div>
   );
}

function showPass(passwordArea, showIcon, setShowIcon) {
   const passwordType = passwordArea.getAttribute('type') === 'password' ? 'text' : 'password';
   passwordArea.setAttribute('type', passwordType);
   setShowIcon(!showIcon);
}