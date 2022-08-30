import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { CategoryLabelActive } from "../../shared/components/CategoryLabel/CategoryLabel"
import { InputOnly } from "../../shared/components/InputWithLabel/InputWithLabel"
import { UseDep } from "../../shared/context/ContextDep"
import AppError from "../../utils/AppError"
import { DetailProductCard } from "../DetailProductCard/DetailProductCard"
import './Search.css'
import { SearchDetail } from "./SearchDetail"

export const Search = () => {
    const [value, setValue] = useState('');
    const [product, setProduct] = useState({})
    const [products, setProducts] = useState([])
    const [isActive, setIsActive] = useState(false)
    const { productService } = UseDep();

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const handleSearchClick = async (event) => {
        event.preventDefault()
        try {
            const response = await productService.doGetProductSearch({
                "keyword":value
            })
            console.log(response.data.data);
            setProducts(prevstate => response.data.data)
        } catch (err) {
            AppError(err)
        }
    }

    const handleFormClose = () => {
        setIsActive(prevState => false)
        setProduct(prevState => { })
    }

    const handleFormOpen = (value) => {
        setIsActive(prevState => true)
        setProduct(prevState => value)
    }

    return (
        <div className='categorize-page-srch'>
            {isActive && <DetailProductCard handleClick={handleFormClose} product={product} />} 
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
                        <SearchDetail catalogItems={products} handleFormOpen={handleFormOpen}/>
                    </div>
                </div>
            </div>    
        </div>
    )
}