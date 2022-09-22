import { useRef, useState } from 'react'
import { BioColomn } from '../../shared/components/BioColomn/BioColomn'
import { ButtonComponent, ButtonComponentSm } from '../../shared/components/Button/Button'
import { ImagesViewAddPostOne, ImageViewAddPostMany } from '../../shared/components/ImagesViewAddPost/ImagesViewAddPost'
import { InputTextLabelSm } from '../../shared/components/InputWithLabel/InputWithLabel'
import { Title3White } from '../../shared/components/Label/Label'
import { LoadingScreen } from '../../shared/components/LoadingScreen/LoadingScreen'
import { PanicPopUpScreen, SuccessPopUpScreen } from '../../shared/components/PopUpScreen/PopUpScreen'
import { UseDep } from '../../shared/context/ContextDep'
import AppError from '../../utils/AppErrors'
import './EditProduct.css'

export const EditProduct = ({ product, handleEdit, setRefresh, handleClick }) => {
    const productId = product.product_id
    const productName = product.product_name
    const productPrice = product.price
    const caption = product.caption
    const links = product.detail_media_products
    const maxLength = 280

    const [isLoading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [panic, setPanic] = useState({ isPanic: false, errMsg: '' });

    const inputRef = useRef();
    const triggerFileSelectPopup = () => inputRef.current.click();

    const [fileObj, setFileObj] = useState([])
    const [imagePreview, setImagePreview] = useState([...links])
    const [imageHold, setImageHold] = useState([...links])
    const [imageDelete, setImageDelete] = useState([])

    const { productService, productImageService } = UseDep();

    const onSelectFile = (event) => {
        for (let i = 0; i < event.target.files.length; i++) {
            const newImage = event.target.files[i];
            newImage["id"] = Math.random();
            const reader = new FileReader();
            reader.readAsDataURL(newImage)
            reader.addEventListener('load', () => {
                setFileObj((prevState) => [...prevState, { file: newImage, imgPreview: reader.result }])
                setImagePreview(prevState => [...prevState, reader.result])
            })
        }
    }

    const handleDelete = (index) => {
        if (imagePreview.length == 1) {
            setImagePreview(prevState => [])
            if (imageHold.length > 0) {
                setImageDelete(prevState => [...imageHold])
            }
            setImageHold(prevState => [])
            setFileObj(prevState => [])
        } else {
            const holdImagePreviewFront = imagePreview.slice(0, index - 1);
            const holdImagePreviewBack = imagePreview.slice(index, imagePreview.length)
            setImagePreview(prevState => [...holdImagePreviewFront, ...holdImagePreviewBack])
            if (index > imageHold.length) {
                const holdFileObjFront = fileObj.slice(0, index - 1 - imageHold.length)
                const holdFileObjBack = fileObj.slice(index - imageHold.length, fileObj.length)
                setFileObj(prevState => [...holdFileObjFront, ...holdFileObjBack])
            } else {
                const holdImageSendFront = imageHold.slice(0, index - 1)
                const holdImageSendBack = imageHold.slice(index, imageHold.length)
                const holdImageDelete = imageHold.slice(index - 1)
                setImageHold(prevState => [...holdImageSendFront, ...holdImageSendBack])
                setImageDelete(prevState => [...prevState, holdImageDelete])
            }
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


    const [formData, setFormData] = useState({
        productName: productName,
        price: productPrice,
        description: caption
    });
    const [charLength, setCharLength] = useState(0);

    const onChangeProductName = (e) => {
        setFormData(prevState => ({
            ...prevState,
            productName: e.target.value
        }))
    }

    const onChangePrice = (event) => {
        setFormData(prevState => ({
            ...prevState,
            price: event.target.value
        }))
    }

    const onChangeDescription = (event) => {
        setFormData(prevState => ({
            ...prevState,
            description: event.target.value
        }))
        setCharLength(event.target.value.length)
    }

    const saveResponse = async _ => {
        try {
            setLoading(true);
            let imageSend = []
            if (imageHold.length > 0) {
                imageSend = [...imageHold]
            }
            if (fileObj.length > 0) {
                const responseImage = await productImageService.doPostImage(fileObj.map(data => data.file));
                imageSend = [...imageSend, ...responseImage]
            }
            try {
                const response = await productService.doEditProductData({
                    "product_id": `${productId}`,
                    "product_name": formData.productName,
                    "price": `${formData.price}`,
                    "description": formData.description,
                    "detail_media_products": imageSend
                });
                if (imageDelete.length > 0) {
                    try {
                        const response2 = await productImageService.doDeleteImage({
                            url: imageDelete
                        })
                        if (response.status === 200) {
                            setSuccess(true);
                        }
                    } catch (err) {
                        setPanic(prevState => ({
                            ...prevState,
                            isPanic: true, errMsg: AppError(err)
                        }));
                    }
                } else {
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
            handleEdit()
            setRefresh(prevState=>!prevState)
        }
    }

    return (
        <div className='edit-product-bg'>
            <div className='settings-add-product-card'>
                <div className='name-price'>
                    <InputTextLabelSm label={'Name'} id={"productName"} value={formData.productName} handleOnChange={onChangeProductName} style={{ minWidth: '254px' }} />
                    <InputTextLabelSm label={'Price'} id={"price"} value={formData.price} handleOnChange={onChangePrice} style={{ minWidth: '254px' }} />
                </div>

                <div className='description'>
                    <BioColomn label={'Description'} maxLength={maxLength} charLength={charLength} handleChange={onChangeDescription} value={formData.description} />
                </div>
                <div className='add-photo-video'>
                    <Title3White title={"Add Photos/ Video"} />
                    <div className="form-upload">
                        <div className="file-input-card-product">
                            {imagePreview.length > 0
                                ?
                                <>
                                    {imagePreview.length !== 1
                                        ? <ImageViewAddPostMany links={imagePreview.map(data => data)} handleDelete={handleDelete} inputRef={inputRef} onSelectFile={onSelectFile} triggerFileSelectPopup={triggerFileSelectPopup} />
                                        : <ImagesViewAddPostOne link={imagePreview.map(data => data)} handleDelete={handleDelete} inputRef={inputRef} onSelectFile={onSelectFile} triggerFileSelectPopup={triggerFileSelectPopup} />}
                                </>
                                :
                                <>
                                    <input multiple type="file" accept='image/*' ref={inputRef} style={{ display: "none" }} onChange={onSelectFile} name="fileName" />
                                    <button onClick={triggerFileSelectPopup} style={{ borderRadius: "8px" }}>Choose Image</button>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className='button-upload-edit-product'>
                    <ButtonComponentSm label={'Edit'} onClick={saveResponse} />
                    <ButtonComponentSm label={'Cancel'} onClick={handleEdit} />
                </div>
            </div>
            {isLoading && <LoadingScreen />}
            {success && <SuccessPopUpScreen onClickAnywhere={onClickSuccess} />}
            {panic.isPanic && <PanicPopUpScreen onClickAnywhere={onClickPanic} errMsg={panic.errMsg} />}
        </div>
    )
}