import "./Button.css";

export const ButtonComponent = ({ label, onClick, isDisable }) => (
      <>
            <button className={`button-component ${isDisable ? 'button-component-disable' : ''}`} type="submit" onClick={onClick} disabled={isDisable}>{label}</button>
      </>
)