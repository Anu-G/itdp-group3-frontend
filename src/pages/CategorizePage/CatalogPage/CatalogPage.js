import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ImagesViewProfile } from '../../../shared/components/ImagesViewProfile/ImagesViewProfile'
import { UseDep } from '../../../shared/context/ContextDep'
import { AuthSelector } from '../../../shared/selectors/Selectors'
import './CatalogPage.css'

export const CatalogPage = ({accountId}) => {
    const { productService } = UseDep()
    const [products, setProduct] = useState([])
    const authRed = useSelector(AuthSelector)

    useEffect(() => {
        getProducts()
    }, products)

    const getProducts = async () => {
        try {
            const response = await productService.doGetProductByAccount({
                account_id : `${authRed.account_id}`
            })
            console.log(response.data);
            setProduct(prevState => response.data.data)
        } catch (err) {
            if (err.response.data.responseCode === 'X01') {
                alert('please complete your product data first')
             } else {
                if (err.response.status !== 400) {
                    alert(err.message);
                 } else {
                    alert(err.response.data.responseMessage);
                 }
             }
        }
    }

    return (
        <>
            <div className='content-ctn'>
                {products.map(product => {
                    return  <div>
                                <ImagesViewProfile link={product.detail_media_products[0]}/>
                            </div>
                })}
            </div>
        </>
    )
}
