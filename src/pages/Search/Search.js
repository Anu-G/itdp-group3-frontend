import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { CategoryLabelActive } from "../../shared/components/CategoryLabel/CategoryLabel"
import { InputOnly } from "../../shared/components/InputWithLabel/InputWithLabel"
import { LoadingScreenSm } from "../../shared/components/LoadingScreen/LoadingScreen"
import { PanicPopUpScreen } from "../../shared/components/PopUpScreen/PopUpScreen"
import { UseDep } from "../../shared/context/ContextDep"
import { AppErrorAuth } from "../../utils/AppErrors"
import { DetailProductCard } from "../DetailProductCard/DetailProductCard"
import './Search.css'
import { SearchDetail } from "./SearchDetail"

export const Search = () => {
    // state
    const [value, setValue] = useState('');
    const [product, setProduct] = useState({})
    const [products, setProducts] = useState([])
    const [isActive, setIsActive] = useState(false)

    const handleFormClose = () => {
        setIsActive(prevState => false)
        setProduct(prevState => { })
    }

    const handleFormOpen = (value) => {
        setIsActive(prevState => true)
        setProduct(prevState => value)
    }

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    // service
    const { productService } = UseDep();

    const handleSearchClick = async (event) => {
        event.preventDefault()
        try {
            setLoading(true);
            const response = await productService.doGetProductSearch({
                "keyword": value
            })
            setProducts(prevstate => response.data.data)
        } catch (err) {
            if (AppErrorAuth(err)) {
                setPanic(prevState => ({
                    ...prevState,
                    isPanic: true, errMsg: AppErrorAuth(err)
                }));
            }
        } finally {
            setLoading(false);
        }
    }

    // screen
    const [isLoading, setLoading] = useState(false);
    const [panic, setPanic] = useState({ isPanic: false, errMsg: '' });

    const onClickPanic = (value) => {
        setPanic(prevState => ({
            ...prevState,
            isPanic: value, errMsg: ''
        }));
    }

    return (
        <>
            <div className='categorize-page-srch'>
                {isActive && <DetailProductCard handleClick={handleFormClose} product={product} />}
                <div className="categorize-page-lst">
                    <div className="search-hd">
                        <InputOnly label={'search'} handleOnChange={handleChange} id='search' value={value} />
                        <div className="btn-srch" onClick={handleSearchClick}>
                            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" style={{ height: '20px', color: '#1E2329' }} />
                        </div>
                    </div>

                    <div className="srch-ctnt">
                        <div className="srch-lbl-ctg">
                            <CategoryLabelActive label={'Products'} />
                        </div>
                        <div className="srch-rs">
                            {isLoading ? <LoadingScreenSm /> :
                                <SearchDetail catalogItems={products} handleFormOpen={handleFormOpen} />
                            }
                        </div>
                    </div>
                </div>
            </div>

            {panic.isPanic && <PanicPopUpScreen onClickAnywhere={onClickPanic} errMsg={panic.errMsg} />}
        </>
    )
}