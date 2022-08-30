import { useState } from "react";
import { CategoryLabelActive, CategoryLabelInactive } from "../../shared/components/CategoryLabel/CategoryLabel";
import { TimelinePage } from "../TimelinePage/TimelinePage";
import './CategorizePage.css'

export const CategorizePageTimeline = () => {
    const [isActive, setIsActive] = useState([true, false])


    const handleClick = (page) => {
        switch (page) {
            case 1:
                setIsActive([false, true])
                break;
            default:
                setIsActive([true, false])
                break;
        }
    }

    return (
        <div className='categorize-page-timeline'>
            <div className='category-label-btn-wrp'>
                <div className='category-label-btn' onClick={() => handleClick(0)}>
                    {isActive[0] ? <CategoryLabelActive label={'FnB'} /> : <CategoryLabelInactive label={'FnB'} />}
                </div>
                <div className='category-label-btn' onClick={() => handleClick(1)}>
                    {isActive[1] ? <CategoryLabelActive label={'Places'} /> : <CategoryLabelInactive label={'Places'} />}
                </div>
            </div>


            <div className='categorize-ctn'>
                {isActive[0] ? <TimelinePage categoryId={1} /> : <TimelinePage categoryId={3} />}

            </div>



        </div>
    )
}