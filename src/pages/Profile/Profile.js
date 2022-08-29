import React from 'react'
import { ButtonComponent, ButtonComponentSm } from '../../shared/components/Button/Button'
import { SubtitleWhite, Title2Blue, Title2Green, Title2Red, Title2White, Title2Yellow, TitleWhite } from '../../shared/components/Label/Label'
import { Avatar } from '../../shared/components/Avatar/Avatar'
import { CategorizePage } from '../CategorizePage/CategorizePageProfile'
import './Profile.css'

export const Profile = () => {
    const name = 'Coffee XYZ';
    const category = 'Food and Beverages';
    const isOpen = false;
    const open = '10.00';
    const closed = '22.00';
    const bio = `Things aren't going well at all with mom today. She is just a limp noodle and wants to sleep al the time. I sure hop that things get better soon.`
    const imgsrc = 'https://cms-assets.tutsplus.com/cdn-cgi/image/width=630/uploads/users/1223/posts/32827/image/Cafe%20Logo%20Maker%20for%20Coffee%20and%20Tea%20Designs_.jpg'

    return (
        <>
            <div className='profile-page'>
                <div className='top-profile'>
                    <div className='head-profile-left'>
                        <div className='head-profile'>

                            <Avatar link={imgsrc} />

                            <div className='profile-text-item'>
                                <div className='profile-text-head'>
                                    <TitleWhite title={name} />
                                    {isOpen ? <Title2Green title={'OPEN'} /> : <Title2Red title={'CLOSED'} />}
                                </div>
                                <Title2Blue title={category} />
                                <div className='open-hour'>
                                    <SubtitleWhite subtitle={`Today's Open hour`} />
                                    <Title2Yellow title={`${open} - ${closed}`} />
                                </div>
                            </div>
                        </div>

                        <div style={{maxWidth: '736px'}}>
                            <SubtitleWhite subtitle={bio} />
                        </div>
                    </div>
                    <div className='profile-buttons'>
                        <ButtonComponentSm label={'Contact Us'} />
                        <ButtonComponentSm label={'Our Link(s)'} />
                        <ButtonComponentSm label={'Our Store'} />
                    </div>
                </div>

                <CategorizePage />
            </div>
        </>

    )
}
