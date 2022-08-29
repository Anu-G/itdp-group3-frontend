import './CatalogPage.css'

import React from 'react'
import { ImagesViewProfile } from '../../../shared/components/ImagesViewProfile/ImagesViewProfile'
import { Text32White, Title2White, Title3White } from '../../../shared/components/Label/Label'

export const CatalogPage = ({catalogItems=[]}) => {
    /*
        expected : 
        catalogItems = {
            key,
            link: array of Links of image. yang ditampilin yang array[0]
            name: nama product
            price: harga product
        }
    */

    const price = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    })

    
  return (
    <>
        {catalogItems.length==0 ? 
              <div className='catalog-ctn empty'>
              <Title2White title={'No Product Yet'}/>
            </div>
              : ''}
              <div className='catalog-ctn'>
        {catalogItems.map(item => {

            return  (<div key={item.key}>
                        <ImagesViewProfile link={item.link[0]}/>
                        <Title3White title={item.name}/>
                        <Text32White text={price.format(item.Price)}/>
                    </div>)
        })}

    </div>
    </>
    
  )
}
