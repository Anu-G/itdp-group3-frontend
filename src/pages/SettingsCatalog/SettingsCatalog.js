import React from 'react';
import { ButtonComponent } from '../../shared/components/Button/Button';
import { ImagesViewProfile } from '../../shared/components/ImagesViewProfile/ImagesViewProfile';
import { CatalogPage } from '../CategorizePage/CatalogPage/CatalogPage';
import { ImageBasedPage } from '../CategorizePage/ImagesBasedPage/ImageBasedPage';
import { SettingsImageGrid } from '../SettingsImageGrid/SettingsImageGrid';
import './SettingsCatalog.css';

export const SettingsCatalog = () => {

    const links = [
        'https://asset.kompas.com/crops/gsIqLl4O-rNNCt-MiaH40ztt5sk=/0x76:4032x2764/375x240/data/photo/2021/09/11/613c98c27631e.jpg',
        'https://media-assets-ggwp.s3.ap-southeast-1.amazonaws.com/2022/03/Octane-Karakter-Gesit-dan-Berbahaya-di-Apex-Legends-Mobile-2-640x360.jpg',
        'https://asset.kompas.com/crops/gsIqLl4O-rNNCt-MiaH40ztt5sk=/0x76:4032x2764/375x240/data/photo/2021/09/11/613c98c27631e.jpg',
        'https://cdn-www.bluestacks.com/bs-images/pou-banner.jpg',
        'https://asset.kompas.com/crops/gsIqLl4O-rNNCt-MiaH40ztt5sk=/0x76:4032x2764/375x240/data/photo/2021/09/11/613c98c27631e.jpg'
    ];

    return (
        <div className='wrapper'>
            <div className='settings-catalog-card'>
                <div className='add-product-button'>
                    <ButtonComponent label={"Add Product"} />
                </div>

                <CatalogPage />
                {/* <SettingsImageGrid links={links}/> */}

                {/* <div className='wrapper-product-catalog-card'>
                

                <div className='product-catalog-card'>
                    <img src=""/>
                </div>

                <div className='product-catalog-card'>
                    <img src=""/>
                </div>

                <div className='product-catalog-card'>
                    <img src=""/>
                </div>
            </div> */}



            </div>
        </div>
    )
}
