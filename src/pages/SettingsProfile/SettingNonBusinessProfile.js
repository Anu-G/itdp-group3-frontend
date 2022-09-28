import React, { useState, useRef, useCallback, useEffect } from 'react';
import { BioColomn } from '../../shared/components/BioColomn/BioColomn';
import { ButtonComponent } from '../../shared/components/Button/Button';
import './SettingsProfile.css';
import 'react-image-crop/dist/ReactCrop.css';
import getCroppedImg from '../../utils/CropImage';
import Cropper from 'react-easy-crop';
import Slider from '@mui/material/Slider';
import { UseDep } from '../../shared/context/ContextDep';
import AppError from '../../utils/AppErrors';
import { useSelector } from 'react-redux';
import { AuthSelector } from '../../shared/selectors/Selectors';
import { InputTextLabelSm } from '../../shared/components/InputWithLabel/InputWithLabel';
import { PanicPopUpScreen, SuccessPopUpScreen } from '../../shared/components/PopUpScreen/PopUpScreen';

export const SettingsNonBusinessProfile = () => {
   // start profile image processing
   const inputRef = useRef();
   const [image, setImage] = useState(null);
   const [croppedArea, setCroppedArea] = useState(null);
   const [crop, setCrop] = useState({ x: 0, y: 0 });
   const [zoom, setZoom] = useState(1);
   const [result, setResult] = useState(null);
   const [profileImage, setProfileImage] = useState({
      background: `url("${result}")`,
      backgroundSize: "cover"
   });

   const triggerFileSelectPopup = () => inputRef.current.click();

   const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
      setCroppedArea(croppedAreaPixels);
   };

   const onSelectFile = (event) => {
      if (event.target.files && event.target.files.length > 0) {
         const reader = new FileReader();
         reader.readAsDataURL(event.target.files[0]);
         reader.addEventListener("load", () => {
            setImage(reader.result);
         });
      }
   };

   const showCroppedImage = useCallback(async () => {
      try {
         const croppedImage = await getCroppedImg(
            image,
            croppedArea
         );
         setResult(croppedImage);
         setImage(null);
         setProfileImage(prevState => ({
            ...prevState,
            background: "",
            backgroundSize: ""
         }));
      } catch (e) {
         AppError(e)
      }
   }, [croppedArea]);

   useEffect(_ => {
      setProfileImage(prevState => ({
         ...prevState,
         background: `url(${result})`,
         backgroundSize: "cover"
      }));
   }, [result]);
   // end profile image processing

   // state
   const [formData, setFormData] = useState({
      profileBio: "",
      displayName: ""
   });
   const [existing, setExisting] = useState(false)
   const [charLength, setCharLength] = useState(0);
   const maxLength = 150;

   const onChangeDisplayName = (e) => {
      setFormData(prevState => ({
         ...prevState,
         displayName: e.target.value
      }))
   }

   useEffect(_ => {
      setFormData(prevState => ({
         ...prevState,
         displayName: authRed.userName
      }));

      (async _ => {
         try {
            const response = await profileService.doGetNonBusinessProfile({
               account_id: `${authRed.account_id}`
            })

            if (response.data.data.non_business_profile.display_name != "") {
               setExisting(true)

               setProfileImage(prevState => ({
                  ...prevState,
                  background: `url(${response.data.data.non_business_profile.profile_image})`,
                  backgroundSize: "cover"
               }))

               setResult(response.data.data.non_business_profile.profile_image)

               setFormData(prevState => ({
                  ...prevState,
                  profileBio: response.data.data.non_business_profile.profile_bio,
                  displayName: response.data.data.non_business_profile.display_name,
               }))
            }
         } catch (err) {
            AppError(err)
         }
      })()
   }, []);

   const onChangeBio = (event) => {
      setFormData(prevState => ({
         ...prevState,
         profileBio: event.target.value
      }))
      setCharLength(event.target.value.length)
   }

   const charLimitHandle = (e) => {
      if (charLength >= maxLength) {
         e.preventDefault();
      }
   }

   // service
   const { profileImageService, profileService } = UseDep();
   const authRed = useSelector(AuthSelector);

   const saveResponse = async _ => {
      try {
         setLoading(true);
         let submitImage = '';
         if (result.toLowerCase().includes("firebasestorage") === false) {
            let file = await fetch(result).then(r => r.blob()).then(blobFile => new File([blobFile], "imageCropped.jpg", { type: "image/png" }));
            submitImage = await profileImageService.addNonBusinessProfileImage(file);
         } else {
            submitImage = result
         }
         try {
            if (existing) {
               const response = await profileService.updateNonBusinessProfile({
                  account_id: `${authRed.account_id}`,
                  profile_image: submitImage,
                  profile_bio: formData.profileBio,
                  display_name: formData.displayName
               });
               if (response.status === 200) {
                  setSuccess(true);
               }
            } else {
               const response = await profileService.addNonBusinessProfile({
                  account_id: `${authRed.account_id}`,
                  profile_image: submitImage,
                  profile_bio: formData.profileBio,
                  display_name: formData.displayName
               });
               if (response.status === 200) {
                  setSuccess(true);
               }
            }
         } catch (err) {
            setPanic(prevState => ({
               ...prevState,
               isPanic: true, errMsg: AppError(err)
            }));
         }
      } catch (err) {
         setPanic(prevState => ({
            ...prevState,
            isPanic: true, errMsg: AppError(err)
         }));
      } finally {
         setLoading(false);
      }
   }

   // screen
   const [isLoading, setLoading] = useState(false);
   const [success, setSuccess] = useState(false);
   const [panic, setPanic] = useState({ isPanic: false, errMsg: '' });

   const onClickSuccess = (value) => {
      setSuccess(current => value);
   }

   const onClickPanic = (value) => {
      setPanic(prevState => ({
         ...prevState,
         isPanic: value, errMsg: ''
      }));
   }

   return (
      <>
         {image ? (
            <div className='container-cropper'>
               <div className='cropper'>
                  <Cropper image={image} crop={crop} zoom={zoom} aspect={1} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onCropComplete}
                  />
               </div>
               <div className='slider'>
                  <Slider min={1} max={3} step={0.01} value={zoom} onChange={(e, zoom) => setZoom(zoom)} sx={{ color: '#FED154' }} />
                  <ButtonComponent onClick={showCroppedImage} label={"Save Change"} />
               </div>
            </div>
         ) : null
         }

         <div className='wrapper'>
            <div className={`settings-profile-card ${isLoading && 'loading-div'}`}>
               <div className='profile-bio'>
                  <div className='profile-card' style={result ? profileImage : null}>
                     <input type="file" accept='image/*' ref={inputRef} style={{ display: "none" }} onChange={onSelectFile} name="fileName" />
                     <button onClick={triggerFileSelectPopup} style={{ borderRadius: "8px" }}>Choose Image</button>
                  </div>
                  <div className='bio-column'>
                     <InputTextLabelSm id={"displayName"} label={"Display Name"} value={formData.displayName} handleOnChange={onChangeDisplayName} style={{ marginBottom: "12px", width: '400px' }} />
                     <BioColomn label={"Bio:"} maxLength={maxLength} charLength={charLength} handleChange={onChangeBio} charLimitHandle={charLimitHandle} value={formData.profileBio} />
                  </div>
               </div>

               <div className='button-save'>
                  <ButtonComponent label={"Save"} onClick={saveResponse} isLoading={isLoading} />
               </div>
            </div>
         </div>

         {success && <SuccessPopUpScreen onClickAnywhere={onClickSuccess} />}
         {panic.isPanic && <PanicPopUpScreen onClickAnywhere={onClickPanic} errMsg={panic.errMsg} />}
      </>
   )
}