import './CategorizePage.css'
import React, { useEffect, useState } from 'react'
import { CategoryLabelActive, CategoryLabelInactive } from '../../shared/components/CategoryLabel/CategoryLabel'
import { ImagesViewProfile } from '../../shared/components/ImagesViewProfile/ImagesViewProfile'
import { ImageBasedPage } from './ImagesBasedPage/ImageBasedPage'
import { QA } from '../../shared/components/QA/QA'
import { FAQPages } from './FAQPages/FAQPages'
import { CatalogPage } from './CatalogPage/CatalogPage'
import { useSelector } from 'react-redux'
import { AuthSelector } from '../../shared/selectors/Selectors'
import { UseDep } from '../../shared/context/ContextDep'
import AppError from '../../utils/AppError'
import { text } from '@fortawesome/fontawesome-svg-core'
import { TimelinePage } from '../TimelinePage/TimelinePage'
import { useNavigate } from 'react-router'
import { FeedPage } from './FeedPage/FeedPage'

export const CategorizePage = () => {

    const [isActive, setIsActive] = useState([false, false, false])
    const authRed = useSelector(AuthSelector);

    useEffect(() => {
        handleClick();
    }, [])

    // useEffect(() => {
    //     handleImage(feeds)
    // }, [feeds])


    const FAQs = [
        {
            key: 1,
            question: 'What is something that you learned from simply watching a stranger?',
            answer: `I haven't bailed on writing. Look, I'm generating a random paragraph at this very moment in an attempt to get my writing back on track. I am making an effort. I will start writing consistently again!`
        },
        {
            key: 2,
            question: `What is something that has had a big impact on your that you ;observed from afar?`,
            answer: `It's always good to bring a slower friend with you on a hike. If you happen to come across bears, the whole group doesn't have to worry. Only the slowest in the group do. That was the lesson they were about to learn that day.`
        },
        {
            key: 3,
            question: `What's your good luck charm?`,
            answer: `Yes in but got you more nothing less good bubble word knock out balloon.`
        }
    ]

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
        <>
            <div className='categorize-page-profile'>
                <div className='category-label-btn-wrp'>
                    <div className='category-label-btn' onClick={() => handleClick(0)}>
                        {isActive[0] ? <CategoryLabelActive label={'Post'} /> : <CategoryLabelInactive label={'Post'} />}
                    </div>
                    <div className='category-label-btn' onClick={() => handleClick(1)}>
                        {isActive[1] ? <CategoryLabelActive label={'Catalog'} /> : <CategoryLabelInactive label={'Catalog'} />}
                    </div>
                    {FAQs ?

                        <div className='category-label-btn' onClick={() => handleClick(2)}>
                            {isActive[2] ? <CategoryLabelActive label={'FAQ'} /> : <CategoryLabelInactive label={'FAQ'} />}
                        </div> :
                        ''
                    }
                </div>
                {isActive[0] ? <FeedPage /> : ''}
                {isActive[1] ? <CatalogPage /> : ''}
                {isActive[2] ? <FAQPages FAQs={FAQs} /> : ''}
            </div >
        </>
    )
}

