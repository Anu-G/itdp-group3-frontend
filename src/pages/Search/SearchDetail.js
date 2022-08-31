import React from 'react'
import { ImagesViewProfile } from '../../shared/components/ImagesViewProfile/ImagesViewProfile'
import { Text32White, Text32Yellow, Title2White, Title3White } from '../../shared/components/Label/Label'

export const SearchDetail = ({ catalogItems, handleFormOpen }) => {
    // const catalogItems = [
    //     {
    //         key: 1,
    //         link:[
    //             'https://asset.kompas.com/crops/gsIqLl4O-rNNCt-MiaH40ztt5sk=/0x76:4032x2764/375x240/data/photo/2021/09/11/613c98c27631e.jpg',
    //         ],
    //         name : 'Nasi Goreng',
    //         Price: 24000,
    //         store: 'Hanamoo'
    //     },
    //     {
    //         key: 2,
    //         link:
    //         ['https://media-assets-ggwp.s3.ap-southeast-1.amazonaws.com/2022/03/Octane-Karakter-Gesit-dan-Berbahaya-di-Apex-Legends-Mobile-2-640x360.jpg'],
    //         name : 'All Day Ticket',
    //         Price: 55000,
    //         store: 'Hanamoo'
    //     },
    //     {
    //         key: 3,
    //         link: 
    //         ['https://asset.kompas.com/crops/gsIqLl4O-rNNCt-MiaH40ztt5sk=/0x76:4032x2764/375x240/data/photo/2021/09/11/613c98c27631e.jpg'],
    //         name : 'Premium Beef',
    //         Price: 50000,
    //         store: 'Hanamoo'
    //     },
    //     {
    //         key: 4,
    //         link: 
    //         ['https://cdn-www.bluestacks.com/bs-images/pou-banner.jpg'],
    //         name : 'Es Teh',
    //         Price: 2000,
    //         store: 'Hanamoo'
    //     },
    //     {
    //         key: 5,
    //         link: [
    //             'https://hips.hearstapps.com/hmg-prod/images/190403-balsamic-mushroom-skewers-123-copy-1554496167.jpeg'],
    //         name : 'Kids PlayGroud',
    //         Price: 10000,
    //         store: 'Hanamoo'
    //     },
    //     {
    //         key: 6,
    //         link: 
    //         ['https://awsimages.detik.net.id/community/media/visual/2019/08/12/71b9b8ff-01fd-4dd4-807b-428537b0e4e2_169.jpeg?w=700&q=90'],
    //         name : 'Sea World',
    //         Price: 100000,
    //         store: 'Hanamoo'
    //     },
    // ]
    // const catalogItems = []

    const price = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    })


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
