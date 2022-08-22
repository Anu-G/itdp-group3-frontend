import "./Button.css";

export const ButtonComponent = ({ label, onClick, isDisable }) => (
   <>
      <button className="button-component" type="submit" onClick={onClick} disabled={isDisable}>{label}</button>
   </>
)