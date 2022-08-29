import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ImagesViewProfile } from '../../../shared/components/ImagesViewProfile/ImagesViewProfile'
import { UseDep } from '../../../shared/context/ContextDep'
import { AuthSelector } from '../../../shared/selectors/Selectors'
import AppError from '../../../utils/AppError'
import './CatalogPage.css'

export const CatalogPage = ({ }) => {
    const { productService } = UseDep()
    const [products, setProduct] = useState([])
    const authRed = useSelector(AuthSelector)

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        try {
            const response = await productService.doGetProductByAccount({
                account_id: `${authRed.account_id}`
            })
            console.log(response.data);
            setProduct(prevState => response.data.data)
        } catch (err) {
            AppError(err);
        }
    }

    return (
        <>
            <div className='content-ctn'>
                {products.map(product => {
                    return <div>
                        <ImagesViewProfile link={product.detail_media_products[0]} />
                    </div>
                })}
            </div>
        </>
    )
}
