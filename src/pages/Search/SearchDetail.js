import React from 'react'
import { ImagesViewProfile } from '../../shared/components/ImagesViewProfile/ImagesViewProfile'
import { Text32White, Text32Yellow, Title2White, Title3White } from '../../shared/components/Label/Label'
import { price } from '../../utils/CommonUtils'

export const SearchDetail = ({ catalogItems, handleFormOpen }) => {
    return (
        <div className={catalogItems == 0 ? 'srch-dtl-empty' : 'srch-dtl'}>
            {
                !catalogItems ?
                    <div className='dtl-srch-ctn'>
                        <Title2White title={'Keyword Not Found'} />
                    </div>

                    :

                    <div className='dtl-srch-ctn'>
                        {
                            catalogItems.map(item => {

                                //bisa dibikin return link juga
                                return (
                                    <div className='item-cell' key={item.key}>
                                        <ImagesViewProfile link={item.detail_media_products[0]} handleClick={_ => handleFormOpen(item)} />
                                        <Title3White title={item.product_name} />
                                        <Text32White text={price.format(item.price)} />
                                        <Text32Yellow text={item.profile_name} />
                                    </div>
                                )
                            })
                        }
                    </div>
            }

        </div>
    )
}
