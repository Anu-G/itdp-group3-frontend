import './DetailProductCard.css'

import React, { useState } from 'react'
import { AvatarSmall } from '../../shared/components/Avatar/Avatar'
import { Caption, Title2Yellow, TitleWhite } from '../../shared/components/Label/Label'
import { NameLocation } from '../../shared/components/NameLocation/NameLocation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { ImagesViewTimeline, ImagesViewTimelineMany } from '../../shared/components/ImagesViewProfile/ImagesViewProfile'
import { far } from '@fortawesome/free-regular-svg-icons'
import { price } from '../../utils/CommonUtils'
import { ButtonComponent, ButtonComponentSm } from '../../shared/components/Button/Button'
import { EditProduct } from '../EditProduct/EditProduct'
import AppError from '../../utils/AppErrors'
import { LoadingScreen } from '../../shared/components/LoadingScreen/LoadingScreen'
import { PanicPopUpScreen, SuccessPopUpScreen } from '../../shared/components/PopUpScreen/PopUpScreen'
import { UseDep } from '../../shared/context/ContextDep'

library.add(fas)
library.add(far)

export const DetailProductCard = ({ handleClick, product, setRefresh }) => {
  // state
  const avatar = product.avatar
  const name = product.profile_name
  const productId = product.product_id
  const productName = product.product_name
  const productPrice = product.price
  const caption = product.caption
  const links = product.detail_media_products
  const [isEdit, setIsEdit] = useState(false);

  const [readMore, setReadMore] = useState(true)

  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [panic, setPanic] = useState({ isPanic: false, errMsg: '' });

  const {productService} = UseDep();

  const onClickSuccess = (value) => {
      setSuccess(current => value);
  }

  const onClickPanic = (value) => {
      setPanic(prevState => ({
          ...prevState,
          isPanic: value, errMsg: ''
      }));
  }

  const handleReadMore = () => {
    setReadMore(!readMore)
  }

  const handleEdit = () => {
    setIsEdit(prevState => !prevState)
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
        await productService.doDeleteProductData({
            "product_id": `${productId}`
        })
        setSuccess(true);
    } catch (err) {
        console.error(err);
        setPanic(prevState => ({
          ...prevState,
          isPanic: true, errMsg: AppError(err)
        }));
    } finally {
        setLoading(false)
        setRefresh()
    }
}

  return (
    <div className='detail-product-bg'>
      <div className='detail-product-wrp'>
        {isEdit 
          ?
            <>
              <EditProduct product={product} handleEdit={handleEdit} setRefresh={setRefresh} handleClick={handleClick}/>
            </>
          :
            <div className='detail-product-ctn'>
              <div>
                <div className='profile-hd'>

                  <AvatarSmall link={avatar} />
                  <div className='name-loc-ctn'>
                    <NameLocation name={name} />
                  </div>

                </div>
                <div className='head-right-corner-container'>
                  <ButtonComponentSm label={"Delete"} onClick={handleDelete} />
                  <ButtonComponentSm label={"Edit"} onClick={handleEdit} />
                  <div className='x-btn' onClick={handleClick}>
                    <FontAwesomeIcon icon="fa-solid fa-xmark" style={{ height: '100%', color: '#FE5454' }} />
                  </div>
                </div>
              </div>

              <div className='food-hd'>
                <TitleWhite title={productName} />
                <Title2Yellow title={price.format(productPrice)} />
              </div>

              <div className='caption-ctn'>
                <Caption text={caption} readMore={readMore} handleReadmore={handleReadMore} />
              </div>

              <>
                <div className='img-view-ctn'>
                  {Array.isArray(links) && links.length !== 1 ? <ImagesViewTimelineMany links={links} /> : <ImagesViewTimeline link={links} />}
                </div>
              </>
            </div>
        }
        {isLoading && <LoadingScreen />}
        {success && <SuccessPopUpScreen onClickAnywhere={onClickSuccess} />}
        {panic.isPanic && <PanicPopUpScreen onClickAnywhere={onClickPanic} errMsg={panic.errMsg} />}
      </div>
    </div>

  )
}