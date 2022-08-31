import React, { useState, useRef, useCallback, useEffect } from 'react';
import { OpenDays, OpenHours } from '../../apps/Constants';
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
import AppError from '../../utils/AppError';
import { LoadingScreen } from '../../shared/components/LoadingScreen/LoadingScreen';
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

    const [totalLink, setTotalLink] = useState(5);
    const linkFormId = [];
    for (let i = 1; i <= totalLink; i++) {
        linkFormId.push(i);
    }
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        categoryId: "",
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

    const profileImageData = new FormData();
    const { profileImageService, profileService, categoryService } = UseDep();
    const authRed = useSelector(AuthSelector);

    const [start, setStart] = useState(Array.from({ length: 7 }, (v, i) => ''));
    const [end, setEnd] = useState(Array.from({ length: 7 }, (v, i) => ''));

    const [isLoading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [panic, setPanic] = useState({ isPanic: false, errMsg: '' });

    useEffect(_ => {
        let newOpenHour = [...businessHour];
        checked.map((val, key) => {
            if (val) {
                newOpenHour[key] = { day: `${key + 1}`, open_hour: '00:00', close_hour: '00:00' };
                // if open != '', set open + close
                handleChangeDropDownStart()
            } else if (!val) {
                newOpenHour[key] = { day: '', open_hour: '', close_hour: '' };
            }
        })
        setBusinessHour(newOpenHour);
    }, [checked])

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

    useEffect(_ => {
        setFormData(prevState => ({
            ...prevState,
            displayName: authRed.userName
        }));

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
    }, []);

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

    const saveResponse = async _ => {
        let file = await fetch(result).then(r => r.blob()).then(blobFile => new File([blobFile], "imageCropped.jpg", { type: "image/png" }));
        profileImageData.append("profile_image", file);

        try {
            setLoading(true);
            let responseImage = undefined;
            let submitImage = '';
            if (result !== null) {
                responseImage = await profileImageService.addBusinessProfileImage(profileImageData);
                submitImage = responseImage.data.data
            }
            try {
                businessHour.map((item, i) => {
                    item.open_hour = start[i];
                    item.close_hour = end[i];
                })
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
                <div className='settings-profile-card'>
                    <div className='profile-bio'>
                        <div className='profile-card' style={result ? profileImage : null}>
                            <input type={'file'} accept='image/*' ref={inputRef} style={{ display: "none" }} onChange={onSelectFile} />
                            <button onClick={triggerFileSelectPopup} style={{ borderRadius: "8px" }}>Choose Image</button>
                        </div>
                        <div className='bio-column'>
                            <InputTextLabelSm id={"displayName"} label={"Display Name"} value={formData.displayName} handleOnChange={onChangeDisplayName} style={{ marginBottom: "12px", width: '400px' }} />
                            <BioColomn label={"Bio:"} maxLength={maxBioLen} charLength={charLength} handleChange={onChangeBio} charLimitHandle={limitBio} value={formData.profileBio} />
                        </div>
                    </div>

                    <div className='settings-category'>
                        <Title3White title={"Category:"} />
                        <span>
                            <CustomDropdown label={'Select Category'} items={categories.map(val => val.category_names)} locked={false} handleChange={handleChangeCategory} />
                        </span>
                    </div>

                    <div className='open-hours'>
                        <Title3White title={"Open Hours:"} />
                        <div className='open-hours-day'>
                            {OpenDays.map((day, i) => <CheckBox label={day} items={OpenHours} valueCB={checked[i]} onChangeCB={e => handleOnChecked(i)} handleChangeStart={e => handleChangeDropDownStart(i, e)} handleChangeEnd={e => handleChangeDropDownEnd(i, e)} />)}
                        </div>
                    </div>

                    <div className='address-link-gmaps'>
                        <div className='address-left'>
                            <BioColomn label={"Address:"} maxLength={maxAddressLen} charLength={charLength} handleChange={onChangeAddress} charLimitHandle={limitAddress} value={formData.address} />
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
                        <ButtonComponent label={"Save"} onClick={saveResponse} />
                    </div>
                </div>
            </div>

            {isLoading && <LoadingScreen />}
            {success && <SuccessPopUpScreen onClickAnywhere={onClickSuccess} />}
            {panic.isPanic && <PanicPopUpScreen onClickAnywhere={onClickPanic} errMsg={panic.errMsg} />}
        </>
    )
}