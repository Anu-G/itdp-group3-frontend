import './CategorizePage.css'

import React, { useState } from 'react'
import { CategoryLabelActive, CategoryLabelInactive } from '../../shared/components/CategoryLabel/CategoryLabel'
import { ImagesViewProfile } from '../../shared/components/ImagesViewProfile/ImagesViewProfile'
import { ImageBasedPage } from './ImagesBasedPage/ImageBasedPage'
import { QA } from '../../shared/components/QA/QA'
import { FAQPages } from './FAQPages/FAQPages'
import { CatalogPage } from './CatalogPage/CatalogPage'

export const CategorizePage = () => {

    const [isActive, setIsActive] = useState([true, false, false])
    const link = 'https://asset.kompas.com/crops/gsIqLl4O-rNNCt-MiaH40ztt5sk=/0x76:4032x2764/375x240/data/photo/2021/09/11/613c98c27631e.jpg';

    const links = [
        'https://asset.kompas.com/crops/gsIqLl4O-rNNCt-MiaH40ztt5sk=/0x76:4032x2764/375x240/data/photo/2021/09/11/613c98c27631e.jpg',
        'https://asset.kompas.com/crops/gsIqLl4O-rNNCt-MiaH40ztt5sk=/0x76:4032x2764/375x240/data/photo/2021/09/11/613c98c27631e.jpg',
        'https://asset.kompas.com/crops/gsIqLl4O-rNNCt-MiaH40ztt5sk=/0x76:4032x2764/375x240/data/photo/2021/09/11/613c98c27631e.jpg',
        'https://asset.kompas.com/crops/gsIqLl4O-rNNCt-MiaH40ztt5sk=/0x76:4032x2764/375x240/data/photo/2021/09/11/613c98c27631e.jpg'
    ];


    const handleClick = (page) => {
        switch (page) {
            case 1:
                setIsActive([false, true, false])
                break;
            case 2:
                setIsActive([false, false, true])
                break;
            default:
                setIsActive([true, false, false])
                break;
        }
    }

    return (
        <div className='categorize-page'>
            <div className='category-label-btn-wrp'>
                <div className='category-label-btn' onClick={() => handleClick(0)}>
                    {isActive[0] ? <CategoryLabelActive label={'Post'} /> : <CategoryLabelInactive label={'Post'} />}
                </div>
                <div className='category-label-btn' onClick={() => handleClick(1)}>
                    {isActive[1] ? <CategoryLabelActive label={'Catalog'} /> : <CategoryLabelInactive label={'Catalog'} />}
                </div>
                <div className='category-label-btn' onClick={() => handleClick(2)}>
                    {isActive[2] ? <CategoryLabelActive label={'FAQ'} /> : <CategoryLabelInactive label={'FAQ'} />}
                </div>
            </div>

            {isActive[0] ? <ImageBasedPage links={links} /> : null}
            {isActive[1] ? <CatalogPage /> : null}
            {isActive[2] ? <FAQPages /> : null}

            {/* <FAQPages/>

        <ImageBasedPage links={links}/> */}

        </div>
    )
}
