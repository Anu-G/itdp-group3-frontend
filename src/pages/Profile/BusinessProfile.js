import React, { useEffect, useState } from 'react'
import { ButtonComponentSm } from '../../shared/components/Button/Button'
import { SubtitleWhite, Title2Blue, Title2Green, Title2Red, Title2Yellow, TitleWhite } from '../../shared/components/Label/Label'
import { Avatar } from '../../shared/components/Avatar/Avatar'
import './Profile.css'
import { useSelector } from 'react-redux'
import { AuthSelector } from '../../shared/selectors/Selectors'
import { UseDep } from '../../shared/context/ContextDep'
import { CategorizePage } from '../CategorizePage/CategorizePageProfile'
import { OurLinks } from '../OurLinks/OurLinks'
import { PanicPopUpScreen } from '../../shared/components/PopUpScreen/PopUpScreen'
import { AppErrorNoProfile } from '../../utils/AppErrors'
import { useNavigate, useParams } from 'react-router'
import SkeletonElement from '../../shared/components/Skeletons/SkeletonElement'
import { height } from '@mui/system'
// import closeTag from './../../../public/Closed-Tag.png'

export const BusinessProfile = () => {
    // state
    const [profile, setProfile] = useState({
        ID: '',
        Address: '',
        ProfileImage: '',
        ProfileBio: '',
        GmapsLink: '',
        DisplayName: '',
        BusinessHours: [],
        BusinessLinks: [],
        PhoneNumber: '',
        CategoryName: ''
    })
    const [isOpen, setIsOpen] = useState(false)
    const [day, setDay] = useState()
    const { accId } = useParams();
    const [openHour, setOpenHour] = useState('')
    const [closeHour, setCloseHour] = useState('')
    const [showOurLinks, setShowOurLinks] = useState(false);

    const handleClickLinks = _ => {
        setShowOurLinks(!showOurLinks);
    }

    const handleClickContact = () => {
        window.open(`https://wa.me/${profile.PhoneNumber}`)
    }

    const handleClickGmaps = () => {
        if (profile.GmapsLink.includes("http://") || profile.GmapsLink.includes("https://")) {
            window.open(`${profile.GmapsLink}`, '_blank')
        } else {
            window.open(`https://${profile.GmapsLink}`, '_blank')
        }
    }

    // service
    const { profileService } = UseDep()
    const authRed = useSelector(AuthSelector);
    const navigate = useNavigate();

    useEffect(() => {
        getUser()
    }, profile)

    const getUser = async () => {
        let useId = 0
        if (accId) {
            useId = accId
        } else {
            useId = authRed.account_id
        }
        try {
            setLoading(true);
            const response = await profileService.doGetBusinessProfile({
                account_id: `${useId}`
            })
            setProfile(prevState => ({
                ...prevState,
                ID: response.data.data.business_profile.ID,
                Address: response.data.data.business_profile.address,
                ProfileImage: response.data.data.business_profile.profile_image,
                ProfileBio: response.data.data.business_profile.profile_bio,
                GmapsLink: response.data.data.business_profile.gmaps_link,
                DisplayName: response.data.data.business_profile.display_name,
                BusinessHours: response.data.data.business_profile.business_hours !== null ? response.data.data.business_profile.business_hours : [],
                BusinessLinks: response.data.data.business_profile.business_links !== null ? response.data.data.business_profile.business_links : [],
                PhoneNumber: response.data.data.phone_number,
                CategoryName: response.data.data.category_name
            }))

        } catch (err) {
            if (AppErrorNoProfile(err)) {
                setPanic(prevState => ({
                    ...prevState,
                    isPanic: true, errMsg: AppErrorNoProfile(err)
                }));
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getDate()
    }, day)

    const getDate = () => {
        let d = new Date()
        let day = d.getDay()
        let hour = d.getHours();

        for (let i = 0; i < profile.BusinessHours.length; i++) {
            if (day == profile.BusinessHours[i].day) {
                setDay(day)
                if (hour >= profile.BusinessHours[i].open_hour && hour <= profile.BusinessHours[i].close_hour) {
                    setIsOpen(true)
                }
                setOpenHour(profile.BusinessHours[i].open_hour)
                setCloseHour(profile.BusinessHours[i].close_hour)
            }
        }

        return false
    }

    // screen
    const [isLoading, setLoading] = useState(false);
    const [panic, setPanic] = useState({ isPanic: false, errMsg: '' });

    const onClickPanic = (value) => {
        setPanic(prevState => ({
            ...prevState,
            isPanic: value, errMsg: ''
        }));
        navigate('/profile/settings/profile');
    }

    return (
        <>
            <div className='profile-page'>
                <div className='top-profile'>
                    <div className='head-profile-left'>
                        <div className='head-profile'>

                            <Avatar link={profile.ProfileImage} isLoading={isLoading} />

                            <div className='profile-text-item'>
                                <div className='profile-text-head'>
                                    {isLoading ? <>
                                        <SkeletonElement type="profile-display-name" />
                                        <SkeletonElement type="profile-isopen" />
                                    </> : <>
                                        <div className='title-business-profile'>
                                            <img src={'/Business-Badge.svg'} style={{ height: '32px' }} />
                                            <TitleWhite title={profile.DisplayName} />
                                        </div>

                                        <div >
                                            {isOpen ? <img src={'/Open-Tag.svg'} style={{ height: '32px' }} /> : <img src={'/Closed-Tag.svg'} style={{ height: '32px' }} />}
                                        </div>

                                    </>}
                                </div>
                                {isLoading ? <SkeletonElement type="profile-category-name" /> : <Title2Blue title={profile.CategoryName} />}
                                <div className='open-hour'>
                                    {isLoading ? <>
                                        <SkeletonElement type="profile-today-open-hour" />
                                        <SkeletonElement type="profile-open-close-hour" />
                                    </> : <>

                                        <SubtitleWhite title={`Today's Open hour`} />
                                        <Title2Yellow title={`${openHour} - ${closeHour}`} />
                                    </>}
                                </div>
                            </div>
                        </div>
                        <div style={{ maxWidth: '736px' }}>
                            {isLoading ? <SkeletonElement type="profile-bio" /> : <SubtitleWhite subtitle={profile.ProfileBio} />}
                        </div>
                    </div>
                    <div className='profile-buttons'>
                        {isLoading ? <>
                            <SkeletonElement type="button-sm" />
                            <SkeletonElement type="button-sm" />
                            <SkeletonElement type="button-sm" />
                        </> : <>
                            {profile.PhoneNumber !== '' && <ButtonComponentSm label={'Contact Us'} onClick={handleClickContact} />}
                            {profile.BusinessLinks !== '' && <ButtonComponentSm label={'Our Link(s)'} onClick={handleClickLinks} />}
                            {profile.GmapsLink !== '' && <ButtonComponentSm label={'Our Store'} onClick={handleClickGmaps} />}
                        </>}
                    </div>
                </div>

                <CategorizePage />
            </div>

            {showOurLinks && <OurLinks handleX={handleClickLinks} links={profile.BusinessLinks} />}
            {panic.isPanic && <PanicPopUpScreen onClickAnywhere={onClickPanic} errMsg={panic.errMsg} />}
        </>

    )
}
