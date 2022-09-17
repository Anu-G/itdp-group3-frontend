import React, { useEffect, useState } from 'react'
import { SubtitleWhite, TitleWhite } from '../../shared/components/Label/Label'
import { Avatar } from '../../shared/components/Avatar/Avatar'
import './Profile.css'
import { useSelector } from 'react-redux'
import { AuthSelector } from '../../shared/selectors/Selectors'
import { UseDep } from '../../shared/context/ContextDep'
import { AppErrorNoProfile } from '../../utils/AppErrors'
import { PanicPopUpScreen } from '../../shared/components/PopUpScreen/PopUpScreen'
import { useNavigate, useParams } from 'react-router'
import SkeletonElement from '../../shared/components/Skeletons/SkeletonElement'

export const NonBusinessProfile = () => {
   // state
   const [profile, setProfile] = useState({
      ProfileImage: '',
      ProfileBio: '',
      DisplayName: '',
   })

   // service
   const { profileService } = UseDep()
   const { accId } = useParams();
   const authRed = useSelector(AuthSelector)
   const navigate = useNavigate();

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
                           </> : <>
                              <TitleWhite title={profile.DisplayName} />
                           </>}
                        </div>
                     </div>
                  </div>
                  <div style={{ maxWidth: '736px' }}>
                     {isLoading ? <SkeletonElement type="profile-bio" /> : <SubtitleWhite subtitle={profile.ProfileBio} />}
                  </div>
               </div>
            </div>
         </div>

         {panic.isPanic && <PanicPopUpScreen onClickAnywhere={onClickPanic} errMsg={panic.errMsg} />}
      </>

   )
}
