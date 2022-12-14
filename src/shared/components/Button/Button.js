import "./Button.css";

export const ButtonComponent = ({ label, onClick, isDisable }) => (
      <>
            <button className={`button-component ${isDisable ? 'button-component-disable' : ''}`} type="submit" onClick={onClick} disabled={isDisable}>{label}</button>
      </>
)

export const ButtonComponentSm = ({ label, onClick, isDisable }) => (
   <>
         <button className={`button-component ${isDisable ? 'button-component-disable' : ''} btn-sm`} type="submit" onClick={onClick} disabled={isDisable}>{label}</button>
   </>
)