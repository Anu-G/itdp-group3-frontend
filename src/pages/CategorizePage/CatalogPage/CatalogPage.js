import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ImagesViewProfile } from '../../../shared/components/ImagesViewProfile/ImagesViewProfile'
import { Text32White, Title2White, Title3White } from '../../../shared/components/Label/Label'
import { UseDep } from '../../../shared/context/ContextDep'
import { AuthSelector } from '../../../shared/selectors/Selectors'
import AppError from '../../../utils/AppError'
import { DetailProductCard } from '../../DetailProductCard/DetailProductCard'
import './CatalogPage.css'

export const CatalogPage = ({ }) => {
    const { settingAccountService } = UseDep()
    const [isActive, setIsActive] = useState(false)
    const [products, setProduct] = useState([])
    const [productOpen, setProductOpen] = useState({})
    const authRed = useSelector(AuthSelector)

    useEffect(() => {
        getProducts()
    }, [])

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

    const price = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    });

    const handleFormClose = () => {
        setIsActive(prevState => false)
        setProductOpen(prevState => { })
    }

    const handleFormOpen = (value) => {
        setIsActive(prevState => true)
        setProductOpen(prevState => value)
    }

    return (
        <>
            {/* <<<<<<< HEAD */}
            {products.length == 0 ?
                <div className='catalog-ctn empty'>
                    <Title2White title={'No Product Yet'} />
                </div> : ''}

            <div className='catalog-ctn'>
                {products.length !== 0 && products.map(item => {
                    return (
                        <div key={item.product_id} className='item-cell'>
                            {item.detail_media_products
                                ? <ImagesViewProfile link={item.detail_media_products[0]} handleClick={_ => handleFormOpen(item)} />
                                : <ImagesViewProfile link="" handleClick={_ => handleFormOpen(item)} />
                            }
                            <Title3White title={item.product_name} />
                            <Text32White text={price.format(item.price)} />
                        </div>
                    )
                    // =======
                    //             {isActive && <DetailProductCard handleClick={handleFormClose} product={productOpen}/>}

                    //             <div className='catalog-ctn'>
                    //                 {products.map(item => {

                    //                     return (<div key={item.product_id}>
                    //                         <ImagesViewProfile item={item} link={item.detail_media_products[0]} handleClick={handleFormOpen}/>
                    //                         <Title3White title={item.product_name} />
                    //                         <Text32White text={price.format(item.price)} />
                    //                     </div>)
                    // >>>>>>> origin/dev-barkah-8-catalog_category_view
                })}
            </div>
            {isActive && <DetailProductCard handleClick={handleFormClose} product={productOpen} />}
        </>
    )
}