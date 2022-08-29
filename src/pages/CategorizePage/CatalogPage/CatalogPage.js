import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ImagesViewProfile } from '../../../shared/components/ImagesViewProfile/ImagesViewProfile'
import { Text32White, Title3White } from '../../../shared/components/Label/Label'
import { UseDep } from '../../../shared/context/ContextDep'
import { AuthSelector } from '../../../shared/selectors/Selectors'
import AppError from '../../../utils/AppError'
import { DetailProductCard } from '../../DetailProductCard/DetailProductCard'
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

    const price = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    })

    return (
        <>
            {true && <DetailProductCard />}

            <div className='catalog-ctn'>
                {products.map(item => {

                    return (<div key={item.product_id}>
                        <ImagesViewProfile link={item.detail_media_products[0]} />
                        <Title3White title={item.product_name} />
                        <Text32White text={price.format(item.price)} />
                    </div>)
                })}

            </div>
        </>
    )
}
