import './SearchColumn.css'

export const SearchColumn = ({ id, handleOnChange, value }) => (
    <div className="search-wrp">
       <input className="search-ctn" type={"text"} id={id} onChange={handleOnChange} value={value} placeholder='I want to search...'/>
       {/* <label className="input-label" htmlFor={id}>{label}</label> */}
    </div>
 );