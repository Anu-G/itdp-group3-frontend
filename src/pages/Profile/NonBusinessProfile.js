import React, { useEffect, useState } from 'react'
import { ButtonComponent, ButtonComponentSm } from '../../shared/components/Button/Button'
import { SubtitleWhite, Title2Blue, Title2Green, Title2Red, Title2White, Title2Yellow, TitleWhite } from '../../shared/components/Label/Label'
import { Avatar } from '../../shared/components/Avatar/Avatar'
import './Profile.css'
import { useSelector } from 'react-redux'
import { AuthSelector } from '../../shared/selectors/Selectors'
import { UseDep } from '../../shared/context/ContextDep'
import { AppErrorNoProfile } from '../../utils/AppError'
import { LoadingScreen } from '../../shared/components/LoadingScreen/LoadingScreen'
import { PanicPopUpScreen } from '../../shared/components/PopUpScreen/PopUpScreen'
import { useNavigate } from 'react-router'

export const NonBusinessProfile = () => {
   const { profileService } = UseDep()
   const [profile, setProfile] = useState({
      ProfileImage: '',
      ProfileBio: '',
      DisplayName: '',
   })
   const authRed = useSelector(AuthSelector)
   const navigate = useNavigate();

   const [isLoading, setLoading] = useState(false);
   const [panic, setPanic] = useState({ isPanic: false, errMsg: '' });

   useEffect(() => {
      getUser()
   }, profile)

   const getUser = async () => {
      try {
         setLoading(true);
         const response = await profileService.doGetNonBusinessProfile({
            account_id: `${authRed.account_id}`
         })

         setProfile(prevState => ({
            ...prevState,
            ProfileImage: response.data.data.non_business_profile.profile_image,
            ProfileBio: response.data.data.non_business_profile.profile_bio,
            DisplayName: response.data.data.non_business_profile.display_name,
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

                     <Avatar link={profile.ProfileImage} />

                     <div className='profile-text-item'>
                        <div className='profile-text-head'>
                           <TitleWhite title={profile.DisplayName} />
                        </div>
                     </div>
                  </div>
                  <div style={{ maxWidth: '736px' }}>
                     <SubtitleWhite subtitle={profile.ProfileBio} />
                  </div>
               </div>
            </div>
         </div>

         {isLoading && <LoadingScreen />}
         {panic.isPanic && <PanicPopUpScreen onClickAnywhere={onClickPanic} errMsg={panic.errMsg} />}
      </>

   )
}
