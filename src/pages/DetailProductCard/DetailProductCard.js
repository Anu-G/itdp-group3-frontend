import './DetailProductCard.css'

import React, { useState } from 'react'

import { AvatarSmall } from '../../shared/components/Avatar/Avatar'
import { Caption, Text32White, Title2Yellow, Title3White, TitleWhite } from '../../shared/components/Label/Label'
import { NameLocation } from '../../shared/components/NameLocation/NameLocation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { ImagesViewTimeline, ImagesViewTimelineMany } from '../../shared/components/ImagesViewProfile/ImagesViewProfile'
import { far } from '@fortawesome/free-regular-svg-icons'


library.add(fas)
library.add(far)

export const DetailProductCard = ({avatar = '', name = '', productName='', productPrice=0, caption='', links=[]}) => {
  /*
  expected :
    avatar : link
    name : user display name (string)
    productName : nama product (string)
    productPrice : harga product (number)
    caption : product description (string)
    links: product Image. Array of links. (yang ditampilin jdi thum image yang pertama. kalu cuman 1 brati cuman tampilin yang pertama)

  */
    
    
    const price = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    })

    const [isActive, setIsActive] = useState(false)
    const [readMore, setReadMore] = useState(true)

 

    const handleReadMore = () => {
      setReadMore(!readMore)
    }

    const handleX = () => {
      console.log('ceritanya back')
    }


  return (
    <div className='detail-product-bg'>
      <div className='detail-product-wrp'>
        <div className='detail-product-ctn'>
          <div>
            <div className='profile-hd'>

              <AvatarSmall link={avatar}/>
              <div className='name-loc-ctn'>
                  <NameLocation name={name} />
              </div>

            </div>
            <div className='x-btn' onClick={handleX}>
              
            <FontAwesomeIcon icon="fa-solid fa-xmark" style={{height: '100%', color:'#FE5454'}}/>
              
            </div>
          </div>

          <div className='food-hd'>
            <TitleWhite title={productName}/>
            <Title2Yellow title={price.format(productPrice)}/>

          </div>

          <div className='caption-ctn'>
            <Caption text={caption} readMore={readMore} handleReadmore={handleReadMore} />
          </div>

          <>
            <div className='img-view-ctn'>
              {typeof links !== 'string' ? <ImagesViewTimelineMany links={links}/> : <ImagesViewTimeline link={links}/> }
            </div>
          </>
        </div>
      </div>
    </div>
    
  )
}