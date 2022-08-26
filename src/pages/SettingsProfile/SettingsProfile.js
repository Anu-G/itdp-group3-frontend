import React, { useState, useRef, useCallback, useEffect } from 'react';
import { OpenDays, OpenHours } from '../../apps/Constants';
import { BioColomn } from '../../shared/components/BioColomn/BioColomn';
import { ButtonComponent } from '../../shared/components/Button/Button';
import { CheckBox } from '../../shared/components/CheckBox/CheckBox';
import { CustomDropdown } from '../../shared/components/Dropdown/Dropdown';
import { InputTextLabelLg, InputTextLabelSm } from '../../shared/components/InputWithLabel/InputWithLabel';
import { Title2White, Title3White } from '../../shared/components/Label/Label';
import './SettingsProfile.css';
import 'react-image-crop/dist/ReactCrop.css';
import getCroppedImg from '../../utils/CropImage';
import Cropper from 'react-easy-crop';
import Slider from '@mui/material/Slider';

export const SettingsProfile = () => {
    const [totalLink, setTotalLink] = useState(5);
    const linkFormId = [];
    for (let i = 1; i <= totalLink; i++) {
        linkFormId.push(i);
    }

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
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        account_id: "",
        category_id: "",
        address: "",
        profile_image: "",
        profile_bio: "",
        gmaps_link: "",
        display_name: "",
        business_hours: [],
        business_links: []
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

    const saveResponse = _ => {
        console.log('Hello World');
    }

    const onChange = (key, val) => {
        setFormData(prevState => ({
            ...prevState,
            [key]: val
        }))
    }

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

    useEffect(_ => {
        setCategories(["FnB", "Places"])
    }, []);

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
                        <div className='bio'>
                            <Title2White title={"Free Coffee"} /><br />
                            <BioColomn />
                        </div>
                    </div>

                    <div className='settings-category'>
                        <Title3White title={"Category:"} />
                        <span>
                            <CustomDropdown label={'Select Category'} items={categories} locked={false} />
                        </span>
                    </div>

                    <div className='open-hours'>
                        <Title3White title={"Open Hours:"} />
                        <div className='open-hours-day'>
                            {OpenDays.map(day => <CheckBox label={day} items={OpenHours} />)}
                        </div>
                    </div>

                    <div className='address-link-gmaps'>
                        <div className='address-left'>
                            <Title3White title={"Address: "} />
                            <textarea className='textarea-address' />
                        </div>
                        <div className='address-right'>
                            <InputTextLabelLg id={"gmaps"} label={"Google Maps Link"} />
                        </div>
                    </div>
                    <div className='website-link'>
                        <div className='address-left'>
                            {linkFormId.map(val =>
                                <InputTextLabelSm id={val} label={`nama website ${val}`} style={{ marginTop: "12px" }} />)}
                        </div>
                        <div className='address-right'>
                            {linkFormId.map(val =>
                                <InputTextLabelSm id={val} label={`link website ${val}`} style={{ marginTop: "12px", width: "600px" }} />)}
                        </div>
                    </div>

                    <div className='button-save'>
                        <ButtonComponent label={"Save"} onClick={saveResponse} />
                    </div>
                </div>
            </div>
        </>
    )
}