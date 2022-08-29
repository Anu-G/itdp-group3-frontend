import React, { useEffect, useState } from 'react'
import { ButtonComponentSm } from '../../shared/components/Button/Button'
import { SubtitleWhite, Title2Blue, Title2Green, Title2Red, Title2White, Title2Yellow, TitleWhite } from '../../shared/components/Label/Label'
import { Avatar } from '../../shared/components/Avatar/Avatar'
import { CategorizePage } from '../CategorizePage/CategorizePage'
import './Profile.css'
import { useSelector } from 'react-redux'
import { AuthSelector } from '../../shared/selectors/Selectors'
import { UseDep } from '../../shared/context/ContextDep'

export const BusinessProfile = () => {
    const { profileService } = UseDep()
    const [profile, setProfile] = useState({
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
    const [openHour, setOpenHour] = useState('')
    const [closeHour, setCloseHour] = useState('')
    const authRed = useSelector(AuthSelector)

    useEffect(() => {
        getUser()
    }, profile)

    useEffect(() => {
        getDate()
    }, day)

    const getUser = async () => {
        try {
            const response = await profileService.doGetBusinessProfile({
                account_id: `${authRed.account_id}`
            })

            setProfile(prevState => ({
                ...prevState,
                Address: response.data.data.business_profile.address,
                ProfileImage: response.data.data.business_profile.profile_image,
                ProfileBio: response.data.data.business_profile.profile_bio,
                GmapsLink: response.data.data.business_profile.gmaps_link,
                DisplayName: response.data.data.business_profile.display_name,
                BusinessHours: response.data.data.business_profile.business_hours,
                BusinessLinks: response.data.data.business_profile.business_links,
                PhoneNumber: response.data.data.phone_number,
                CategoryName: response.data.data.category_name
            }))

        } catch (err) {
            if (err.response.data.responseCode === 'X01') {
                alert('please complete your profile data first')
            } else {
                if (err.response.status !== 400) {
                    alert(err.message);
                } else {
                    alert(err.response.data.responseMessage);
                }
            }
        }
    }

    const getDate = () => {
        let d = new Date()
        let day = d.getDay()

        for (let i = 0; i < profile.BusinessHours.length; i++) {
            if (day == profile.BusinessHours[i].day) {
                setDay(day)
                setIsOpen(true)
                setOpenHour(profile.BusinessHours[i].open_hour)
                setCloseHour(profile.BusinessHours[i].close_hour)
            }
        }

        return false
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

    return (
        <>
            <div className='profile-page'>
                <div className='top-profile'>
                    <div className='head-profile-left'>
                        <div className='head-profile'>

                            <Avatar link={profile.ProfileImage} />

                            <div className='profile-text-item'>
                                <div className='profile-text-head'>
                                    <TitleWhite title={profile.DisplayName} />
                                    {isOpen ? <Title2Green title={'OPEN'} /> : <Title2Red title={'Closed'} />}
                                </div>
                                <Title2Blue title={profile.CategoryName} />
                                <div className='open-hour'>
                                    <SubtitleWhite title={`Today's Open hour`} />
                                    <Title2Yellow title={`${openHour} - ${closeHour}`} />
                                </div>
                            </div>
                        </div>
                        <div style={{ maxWidth: '736px' }}>
                            <SubtitleWhite subtitle={profile.ProfileBio} />
                        </div>
                    </div>
                    <div className='profile-buttons'>
                        {profile.PhoneNumber !== '' && <ButtonComponentSm label={'Contact Us'} onClick={handleClickContact} />}
                        <ButtonComponentSm label={'Our Link(s)'} />
                        {profile.GmapsLink !== '' && <ButtonComponentSm label={'Our Store'} onClick={handleClickGmaps} />}
                    </div>
                </div>

                <CategorizePage />
            </div>
        </>

    )
}
