import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ImagesViewProfile } from '../../../shared/components/ImagesViewProfile/ImagesViewProfile'
import { Text32White, Title2White, Title3White } from '../../../shared/components/Label/Label'
import { UseDep } from '../../../shared/context/ContextDep'
import { AuthSelector } from '../../../shared/selectors/Selectors'
import AppError from '../../../utils/AppErrors'
import { price } from '../../../utils/CommonUtils'
import { DetailProductCard } from '../../DetailProductCard/DetailProductCard'
import './CatalogPage.css'

export const CatalogPage = ({ }) => {
    // state
    const [isActive, setIsActive] = useState(false)
    const [products, setProduct] = useState([])
    const [productOpen, setProductOpen] = useState({})

    const handleFormClose = () => {
        setIsActive(prevState => false)
        setProductOpen(prevState => { })
    }

    const handleFormOpen = (value) => {
        setIsActive(prevState => true)
        setProductOpen(prevState => value)
    }

    // service
    const { settingAccountService } = UseDep()
    const authRed = useSelector(AuthSelector)

    const getProducts = async () => {
        try {
            const response = await settingAccountService.doGetAccountProduct({
                account_id: authRed.account_id
            })
            if (response.data.data !== null) {
                setProduct(response.data.data)
            }
        } catch (err) {
            AppError(err);
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    const restring = (str) => {
        const newStr = str.slice(0, 15);
        newStr = newStr.concat('', '...');
        return newStr
    }

    return (
        <>
            {products.length == 0 ?
                <div className='catalog-ctn empty'>
                    <Title2White title={'No Product Yet'} />
                </div> : null}

            <div className='catalog-ctn'>
                {products.length !== 0 && products.map(item => {
                    return (
                        <div className='item-cell-ctn'>
                            <div key={item.product_id} className='item-cell-x'>
                                {item.detail_media_products
                                    ? <ImagesViewProfile link={item.detail_media_products[0]} handleClick={_ => handleFormOpen(item)} />
                                    : <ImagesViewProfile link="" handleClick={_ => handleFormOpen(item)} />
                                }

                                <div style={{paddingRight:'4px', paddingLeft:'4px'}}>
                                <Title3White title={item.product_name.length <  15 ? item.product_name : item.product_name.slice(0, 15).concat('', '...')} />
                                </div>
                                <div style={{paddingRight:'20px', paddingLeft:'20px'}}>

                                <Text32White text={price.format(item.price)} />
                                </div>
                            </div>
                            
                        </div>
                    )
                })}
            </div>

            {isActive && <DetailProductCard handleClick={handleFormClose} product={productOpen} />}
        </>
    )
}