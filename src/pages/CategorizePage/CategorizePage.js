import './CategorizePage.css'

import React, { useEffect, useState } from 'react'
import { CategoryLabelActive, CategoryLabelInactive } from '../../shared/components/CategoryLabel/CategoryLabel'
import { ImagesViewProfile } from '../../shared/components/ImagesViewProfile/ImagesViewProfile'
import { ImageBasedPage } from './ImagesBasedPage/ImageBasedPage'
import { QA } from '../../shared/components/QA/QA'
import { FAQPages } from './FAQPages/FAQPages'
import { useSelector } from 'react-redux'
import { AuthSelector } from '../../shared/selectors/Selectors'
import { UseDep } from '../../shared/context/ContextDep'
import AppError from '../../utils/AppError'
import { text } from '@fortawesome/fontawesome-svg-core'

export const CategorizePage = () => {

    const [isActive, setIsActive] = useState([true, false, false])
    const [feeds, setFeeds] = useState([])
    const [links,setLinks] = useState([])
    const link = 'https://asset.kompas.com/crops/gsIqLl4O-rNNCt-MiaH40ztt5sk=/0x76:4032x2764/375x240/data/photo/2021/09/11/613c98c27631e.jpg';
    const authRed = useSelector(AuthSelector);
    const { accountPostService } = UseDep();

    useEffect(()=>{
        handleLoad()
        handleImage(feeds)
    },[])

    useEffect(()=>{
        handleLoad()
        handleImage(feeds)
    },[isActive])

    const handleLoad = async () => {
        try {
            const response = await accountPostService.doGetAccount({
                "account_id":1,
                "page":1,
                "page_lim":100
            })
            setFeeds(response.data.data)
        } catch (err) {
            AppError(err);
            return [];
        }
    }

    const handleImage = (feeds) => {
        let linkHold = ""
        for (const feed of feeds) {
            linkHold = feed.detail_media_feeds.split(",",1)
            const linksInput = [links,linkHold]
            setLinks(linksInput)
        }
    }

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
    console.log(links);
  return (
    <div className='categorize-page'>
        <div className='category-label-btn-wrp'>
            <div className='category-label-btn' onClick={()=> handleClick(0)}>
                {isActive[0] ? <CategoryLabelActive label={'Post'}/> : <CategoryLabelInactive label={'Post'}/>}
            </div>
            <div className='category-label-btn' onClick={()=> handleClick(1)}>
                {isActive[1] ? <CategoryLabelActive label={'Catalog'}/> : <CategoryLabelInactive label={'Catalog'}/>}
            </div>
            <div className='category-label-btn' onClick={()=> handleClick(2)}>
                {isActive[2] ? <CategoryLabelActive label={'FAQ'}/> : <CategoryLabelInactive label={'FAQ'}/>}
            </div>
        </div>

        {isActive[2] ? <FAQPages/> : <ImageBasedPage links={links}/>}

        {/* <FAQPages/>

        <ImageBasedPage links={links}/> */}
        
    </div>
  )
}
