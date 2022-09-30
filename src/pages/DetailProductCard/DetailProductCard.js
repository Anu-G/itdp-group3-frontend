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
import { ButtonComponent, ButtonComponentSm, ButtonComponentXsm } from '../../shared/components/Button/Button'
import { EditProduct } from '../EditProduct/EditProduct'
import AppError from '../../utils/AppErrors'
import { LoadingScreen } from '../../shared/components/LoadingScreen/LoadingScreen'
import { PanicPopUpScreen, SuccessPopUpScreen } from '../../shared/components/PopUpScreen/PopUpScreen'
import { UseDep } from '../../shared/context/ContextDep'
import { useNavigate, useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { AuthSelector } from '../../shared/selectors/Selectors'

library.add(fas)
library.add(far)

export const DetailProductCard = ({ handleClick, product, setRefresh, profileStatus = false }) => {
  // state
  const avatar = product.avatar
  const name = product.profile_name
  const productId = product.product_id
  const productName = product.product_name
  const productPrice = product.price
  const caption = product.caption
  const links = product.detail_media_products
  const taccId = product.account_id

  const [readMore, setReadMore] = useState(true)

  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [panic, setPanic] = useState({ isPanic: false, errMsg: '' });

  const authRed = useSelector(AuthSelector)

  const navigate = useNavigate()

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

  const handleClickName = () => {
    if (taccId == authRed.account_id) {
        navigate('/profile')
    } else {
        navigate(`/account/${taccId}`, {
            state: {
                accountType: "2"
            }
        })
    }
  }

  return (
    <div className='detail-product-bg'>
      <div className='detail-product-wrp'>
          <div className='detail-product-ctn'>
            <div>
              <div className='profile-hd-dp'>
                <div className='profile-hd-content-dp'>
                  <AvatarSmall link={avatar} profileStatus={profileStatus} handleClick={()=>handleClickName()}/>
                  <div className='name-loc-ctn'>
                    <NameLocation name={name} profileStatus={profileStatus} handleClick={handleClickName}/>
                  </div>
                </div>
                <div className='head-right-corner-container'>
                  <div className='x-btn' onClick={handleClick}>
                    <FontAwesomeIcon icon="fa-solid fa-xmark" style={{ height: '100%', color: '#FE5454' }} />
                  </div>
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
        {isLoading && <LoadingScreen />}
        {success && <SuccessPopUpScreen onClickAnywhere={onClickSuccess} />}
        {panic.isPanic && <PanicPopUpScreen onClickAnywhere={onClickPanic} errMsg={panic.errMsg} />}
      </div>
    </div>

  )
}