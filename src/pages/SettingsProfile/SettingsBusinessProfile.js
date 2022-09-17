import React, { useState, useRef, useCallback, useEffect } from 'react';
import { OpenDays, OpenHours } from '../../shared/constants/AppConstants';
import { BioColomn } from '../../shared/components/BioColomn/BioColomn';
import { ButtonComponent } from '../../shared/components/Button/Button';
import { CheckBox } from '../../shared/components/CheckBox/CheckBox';
import { CustomDropdown } from '../../shared/components/Dropdown/Dropdown';
import { InputTextLabelSm } from '../../shared/components/InputWithLabel/InputWithLabel';
import { Title3White } from '../../shared/components/Label/Label';
import './SettingsProfile.css';
import 'react-image-crop/dist/ReactCrop.css';
import getCroppedImg from '../../utils/CropImage';
import Cropper from 'react-easy-crop';
import Slider from '@mui/material/Slider';
import { UseDep } from '../../shared/context/ContextDep';
import { useSelector } from 'react-redux';
import { AuthSelector } from '../../shared/selectors/Selectors';
import AppError from '../../utils/AppErrors';
import { PanicPopUpScreen, SuccessPopUpScreen } from '../../shared/components/PopUpScreen/PopUpScreen';

export const SettingsBusinessProfile = () => {
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
            console.error(e)
        }
    }, [croppedArea]);

    useEffect(_ => {
        setProfileImage(prevState => ({
            ...prevState,
            background: `url(${result})`,
            backgroundSize: "cover"
        }));

        setFormData(prevState => ({
            ...prevState,
            profile_image: result
        }));
    }, [result]);
    // end profile image processing

    // state
    const [totalLink, setTotalLink] = useState(5);
    const linkFormId = [];
    for (let i = 1; i <= totalLink; i++) {
        linkFormId.push(i);
    }
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        categoryId: "",
        categoryName: "",
        address: "",
        profileBio: "",
        gmapsLink: "",
        displayName: "",
        businessLinks: Array.from({ length: totalLink }, (v, i) => ({
            label: '', link: ''
        }))
    });
    const [checked, setChecked] = useState(Array.from({ length: 7 }, (v, i) => false));
    const [businessHour, setBusinessHour] = useState(Array.from({ length: 7 }, (v, i) => ({ day: '', open_hour: '', close_hour: '' })));
    const [charLength, setCharLength] = useState(0);
    const maxBioLen = 150;
    const maxAddressLen = 250;
    const [start, setStart] = useState(Array.from({ length: 7 }, (v, i) => ''));
    const [end, setEnd] = useState(Array.from({ length: 7 }, (v, i) => ''));
    const [existing, setExisting] = useState(false)

    useEffect(_ => {
        let newOpenHour = [...businessHour];
        checked.map((val, key) => {
            if (val) {
                if (newOpenHour[key].day === '') {
                    newOpenHour[key] = { day: `${key + 1}`, open_hour: '00:00', close_hour: '00:00' };
                }
                // if open != '', set open + close
                handleChangeDropDownStart()
            } else if (!val) {
                newOpenHour[key] = { day: '', open_hour: '', close_hour: '' };
            }
        })
        setBusinessHour(newOpenHour);

        if (categories.length !== 0 && formData.categoryName !== '') {
            handleChangeCategory(formData.categoryName);
        }
    }, [checked, formData.categoryName, categories])

    const handleChangeDropDownStart = (i, value) => {
        let newStart = [...start];
        newStart[i] = value;
        setStart(newStart);
    }

    const handleChangeDropDownEnd = (i, value) => {
        let newEnd = [...end];
        newEnd[i] = value;
        setEnd(newEnd);
    }

    const handleChangeCategory = (value) => {
        let match = categories.find(item => item.category_names === value)
        setFormData(prevState => ({
            ...prevState,
            categoryId: match.category_id
        }))
    }

    const handleOnChecked = (key, val) => {
        let newCheck = [...checked];
        newCheck[key] = !newCheck[key];
        setChecked(newCheck);
    }

    const onChangeBio = (event) => {
        setFormData(prevState => ({
            ...prevState,
            profileBio: event.target.value
        }))
        setCharLength(event.target.value.length)
    }

    const onChangeAddress = (event) => {
        setFormData(prevState => ({
            ...prevState,
            address: event.target.value
        }))
        setCharLength(event.target.value.length)
    }

    const limitBio = (e) => {
        if (charLength >= maxBioLen) {
            e.preventDefault();
        }
    }

    const limitAddress = (e) => {
        if (charLength >= maxAddressLen) {
            e.preventDefault();
        }
    }

    const onChangeDisplayName = (e) => {
        setFormData(prevState => ({
            ...prevState,
            displayName: e.target.value
        }))
    }

    const onChangeGmaps = (e) => {
        setFormData(prevState => ({
            ...prevState,
            gmapsLink: e.target.value
        }))
    }

    const onChangeLinksLabels = (key, val) => {
        let newLabels = [...formData.businessLinks];
        newLabels[key - 1].label = val;
        setFormData(prevState => ({
            ...prevState,
            businessLinks: newLabels
        }));
    }

    const onChangeLinksWebsite = (key, val) => {
        let newWebsite = [...formData.businessLinks];
        newWebsite[key - 1].link = val;
        setFormData(prevState => ({
            ...prevState,
            businessLinks: newWebsite
        }));
    }

    // service
    const { profileImageService, profileService, categoryService } = UseDep();
    const authRed = useSelector(AuthSelector);

    useEffect(_ => {
        (async _ => {
            try {
                const response = await categoryService.doGetCategories()
                if (response.status === 200) {
                    setCategories(response.data.data);
                }
            } catch (err) {
                AppError(err);
            }
        })();

        (async _ => {
            try {
                const response = await profileService.doGetBusinessProfile({
                    account_id: `${authRed.account_id}`
                })

                if (response.data.data.business_profile.display_name !== "") {
                    setExisting(true)

                    setProfileImage(prevState => ({
                        ...prevState,
                        background: `url(${response.data.data.business_profile.profile_image})`,
                        backgroundSize: "cover"
                    }));

                    setResult(response.data.data.business_profile.profile_image)

                    setFormData(prevState => ({
                        ...prevState,
                        address: response.data.data.business_profile.address,
                        profileBio: response.data.data.business_profile.profile_bio,
                        gmapsLink: response.data.data.business_profile.gmaps_link,
                        displayName: response.data.data.business_profile.display_name,
                        categoryName: response.data.data.category_name
                    }))

                    if (response.data.data.business_profile.business_links) {
                        let businessLinkTemp = [...formData.businessLinks]
                        let responseBusinessLink = response.data.data.business_profile.business_links
                        for (let i = 0; i < businessLinkTemp.length; i++) {
                            let index = businessLinkTemp.map(prop => prop.label).indexOf('')
                            if (index !== -1 && i < responseBusinessLink.length) {
                                businessLinkTemp[index].label = responseBusinessLink[i].label
                                businessLinkTemp[index].link = responseBusinessLink[i].link
                            }
                        }
                        setFormData(prevState => ({
                            ...prevState,
                            businessLinks: businessLinkTemp
                        }));
                    }

                    let businessHourTemp = response.data.data.business_profile.business_hours
                    let newCheck = [...checked];
                    let newOpenHour = [...businessHour];
                    let newStart = [...start];
                    let newEnd = [...end]
                    for (let i = 0; i < businessHourTemp.length; i++) {
                        let day = businessHourTemp[i].day
                        newCheck[day - 1] = !newCheck[day - 1];
                        newOpenHour[day - 1] = { day: `${day}`, open_hour: businessHourTemp[i].open_hour, close_hour: businessHourTemp[i].close_hour };
                        newStart[day - 1] = businessHourTemp[i].open_hour
                        newEnd[day - 1] = businessHourTemp[i].close_hour

                        setChecked(newCheck);
                        setBusinessHour(newOpenHour)
                        setStart(newStart);
                        setEnd(newEnd)
                    }
                }
            } catch (err) {
                AppError(err)
            }
        })()
    }, []);

    const saveResponse = async _ => {
        try {
            setLoading(true);
            let submitImage = '';
            if (result.toLowerCase().includes("firebasestorage") === false) {
                let file = await fetch(result).then(r => r.blob()).then(blobFile => new File([blobFile], "imageCropped.jpg", { type: "image/png" }));
                submitImage = await profileImageService.addBusinessProfileImage(file)
            } else {
                submitImage = result
            }
            try {
                businessHour.map((item, i) => {
                    item.open_hour = start[i];
                    item.close_hour = end[i];
                })
                if (existing) {
                    const response = await profileService.updateBusinessProfile({
                        account_id: `${authRed.account_id}`,
                        category_id: `${formData.categoryId}`,
                        address: formData.address,
                        profile_image: submitImage,
                        profile_bio: formData.profileBio,
                        gmaps_link: formData.gmapsLink,
                        display_name: formData.displayName,
                        business_hours: businessHour.filter(val => val.day !== ''),
                        business_links: formData.businessLinks.filter(val => val.label !== '')
                    });
                    if (response.status === 200) {
                        setSuccess(true);
                    }
                } else {
                    const response = await profileService.addBusinessProfile({
                        account_id: `${authRed.account_id}`,
                        category_id: `${formData.categoryId}`,
                        address: formData.address,
                        profile_image: submitImage,
                        profile_bio: formData.profileBio,
                        gmaps_link: formData.gmapsLink,
                        display_name: formData.displayName,
                        business_hours: businessHour.filter(val => val.day !== ''),
                        business_links: formData.businessLinks.filter(val => val.label !== '')
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
                console.error(err);
            }
        } catch (err) {
            setPanic(prevState => ({
                ...prevState,
                isPanic: true, errMsg: AppError(err)
            }));
            console.error(err);
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
                            <input type={'file'} accept='image/*' ref={inputRef} style={{ display: "none" }} onChange={onSelectFile} />
                            <button onClick={triggerFileSelectPopup} style={{ borderRadius: "8px" }}>Choose Image</button>
                        </div>
                        <div className='bio-column'>
                            <InputTextLabelSm id={"displayName"} label={"Display Name"} value={formData.displayName} handleOnChange={onChangeDisplayName} style={{ marginBottom: "12px", width: '400px' }} />
                            <BioColomn label={"Bio:"} maxLength={maxBioLen} charLength={charLength} handleChange={onChangeBio} value={formData.profileBio} />
                        </div>
                    </div>

                    <div className='settings-category'>
                        <div style={{ paddingTop: '8px' }}>
                            <Title3White title={"Category:"} />

                        </div>
                        <span>
                            <CustomDropdown label={existing ? formData.categoryName : 'Select Category'} items={categories.map(val => val.category_names)} locked={false} handleChange={handleChangeCategory} />

                        </span>
                    </div>

                    <div className='open-hours'>
                        <Title3White title={"Open Hours:"} />
                        <div className='open-hours-day'>
                            {OpenDays.map((day, i) => <CheckBox label={day} items={OpenHours} valueCB={checked[i]} onChangeCB={e => handleOnChecked(i)} handleChangeStart={e => handleChangeDropDownStart(i, e)} handleChangeEnd={e => handleChangeDropDownEnd(i, e)} openHourStart={start[i]} closeHourStart={end[i]} />)}
                        </div>
                    </div>

                    <div className='address-link-gmaps'>
                        <div className='address-left'>
                            <BioColomn label={"Address:"} maxLength={maxAddressLen} charLength={charLength} handleChange={onChangeAddress} value={formData.address} />
                        </div>
                        <div className='address-right'>
                            <InputTextLabelSm id={"gmaps"} label={"Google Maps Link"} value={formData.gmapsLink} handleOnChange={onChangeGmaps} />
                        </div>
                    </div>
                    <div className='website-link'>
                        <div className='address-left'>
                            {linkFormId.map(val =>
                                <InputTextLabelSm id={val} label={`website name ${val}`} style={{ marginTop: "12px", width: '200px' }} handleOnChange={e => onChangeLinksLabels(val, e.target.value)} value={formData.businessLinks[val - 1].label} />)}
                        </div>
                        <div className='address-right'>
                            {linkFormId.map(val =>
                                <InputTextLabelSm id={val} label={`link website ${val}`} style={{ marginTop: "12px", width: '440px' }} handleOnChange={e => onChangeLinksWebsite(val, e.target.value)} value={formData.businessLinks[val - 1].link} />)}
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