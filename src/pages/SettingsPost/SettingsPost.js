import React from 'react';
import { SettingsImageGrid } from '../SettingsImageGrid/SettingsImageGrid';
import './SettingsPost.css';

export const SettingsPost = () => {

    const links = [
        'https://asset.kompas.com/crops/gsIqLl4O-rNNCt-MiaH40ztt5sk=/0x76:4032x2764/375x240/data/photo/2021/09/11/613c98c27631e.jpg',
        'https://media-assets-ggwp.s3.ap-southeast-1.amazonaws.com/2022/03/Octane-Karakter-Gesit-dan-Berbahaya-di-Apex-Legends-Mobile-2-640x360.jpg',
        'https://asset.kompas.com/crops/gsIqLl4O-rNNCt-MiaH40ztt5sk=/0x76:4032x2764/375x240/data/photo/2021/09/11/613c98c27631e.jpg',
        'https://cdn-www.bluestacks.com/bs-images/pou-banner.jpg',
        'https://asset.kompas.com/crops/gsIqLl4O-rNNCt-MiaH40ztt5sk=/0x76:4032x2764/375x240/data/photo/2021/09/11/613c98c27631e.jpg'
    ];

  return (
    <div className='wrapper'>
        <div className='settings-post-card'>
            <SettingsImageGrid links={links}/>

            
        </div>
    </div>
  )
}
