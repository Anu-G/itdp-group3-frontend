import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { CategoryLabelActive } from "../../shared/components/CategoryLabel/CategoryLabel"
import { InputOnly } from "../../shared/components/InputWithLabel/InputWithLabel"
import './Search.css'
import { SearchDetail } from "./SearchDetail"

export const Search = () => {
    const [value, setValue] = useState('')

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const handleSearchClick = () => {

    }

    return (
        <div className='categorize-page-srch'>
            <div className="categorize-page-lst">
                <div className="search-hd">
                    <InputOnly label={'search'} handleOnChange={handleChange} id='search' value={value} />
                    <div className="btn-srch" onClick={handleSearchClick}>
                        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" style={{height:'20px', color:'#1E2329'}}/>
                    </div>
                </div>

                <div className="srch-ctnt">
                    <div className="srch-lbl-ctg">
                        <CategoryLabelActive label={'Products'}/>
                    </div>
                    <div className="srch-rs">
                        <SearchDetail catalogItems={[]}/>
                    </div>
                </div>


            </div>
        
            
    
    
            
        </div>
    )
}