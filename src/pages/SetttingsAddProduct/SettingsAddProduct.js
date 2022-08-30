import React, { useEffect, useState, useRef } from 'react'
import { UseDep } from '../../shared/context/ContextDep';
import { ProgressBar } from 'react-bootstrap'
import { ButtonComponent } from '../../shared/components/Button/Button'
import { InputTextLabelSm } from '../../shared/components/InputWithLabel/InputWithLabel'
import { Title2Yellow, Title3White } from '../../shared/components/Label/Label'
import './SettingsAddProduct.css'
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { AuthSelector } from '../../shared/selectors/Selectors';
import AppError from '../../utils/AppError';
import { BioColomn } from '../../shared/components/BioColomn/BioColomn'

export const SettingsAddProduct = (props) => {
    const maxLength = 280

    let { id, label } = props;
    const inputRef = useRef();
    const [image, setImage] = useState(null);
    const triggerFileSelectPopup = () => inputRef.current.click();

    const onSelectFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.addEventListener("load", () => {
            setImage(reader.result);
        });
        }
    };


    const [formData, setFormData] = useState({
        productName:"",
        price:"",
        description:""
     });

     const [charLength, setCharLength] = useState(0);

    const [result, setResult] = useState(null);
     const productImageData = new FormData();
     const { productImageService, productService } = UseDep();
     const authRed = useSelector(AuthSelector);
  
     const saveResponse = async _ => {
        let file = await fetch(result).then(r => r.blob()).then(blobFile => new File([blobFile], "imageProduct.jpg", { type: "image/png" }));
        productImageData.append("detail_media_products", file);
  
        try {
           const responseImage = await productImageService.doPostProductImage(productImageData);
           if (responseImage.status === 200) {
              try {
                 const response = await productService.doPostProductData({
                    account_id: `${authRed.account_id}`,
                    product_name: formData.productName,
                    price: formData.price,
                    description: formData.description,
                    detail_media_products: [responseImage.data.data]
                 });
                 if (response.status === 200) {
                    alert('success');
                 }
              } catch (err) {
                 AppError(err);
              }
           }
        } catch (err) {
           AppError(err);
        }
     }
  
     const onChangeProductName = (e) => {
        setFormData(prevState => ({
           ...prevState,
           productName: e.target.value
        }))
     }
  
    //  useEffect(_ => {
    //     setFormData(prevState => ({
    //        ...prevState,
    //        productName: authRed.productName
    //     }));
    //  }, []);
  
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
  
     const charLimitHandle = (e) => {
        if (charLength >= maxLength) {
           e.preventDefault();
        }
     }
    return (
        <div className='wrapper'>
            <Title2Yellow title={"New Product"} />
            <div className='settings-add-product-card'>
                <div className='name-price'>
                    <InputTextLabelSm label={'Name'} id={"productName"} value={formData.productName} handleOnChange={onChangeProductName} style={{ minWidth: '254px' }} />
                    <InputTextLabelSm label={'Price'} id={"price"} value={formData.price} handleOnChange={onChangePrice} style={{ minWidth: '254px' }} />
                </div>

                <div className='description'>
                    <BioColomn label={'Description'} maxLength={maxLength} charLength={charLength} handleChange={onChangeDescription} charLimitHandle={charLimitHandle} value={formData.description}/>
                </div>

                <div className='add-photo-video'>
                    <Title3White title={"Add Photos/ Video"} />
                    <div className="form-upload">
                        <label htmlFor={id} className="text-primary font-weight-bold">{label}</label>
                        <div className="d-flex">
                            <div className="d-flex">
                                <input multiple className='file-input' type="file" accept='image/*' ref={inputRef} style={{ display: "none" }} onChange={onSelectFile} name="fileName"  />
                                <button onClick={triggerFileSelectPopup} style={{ borderRadius: "8px" }}>Choose Image</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='button-upload'>
                    <ButtonComponent label={'Upload'} onClick={saveResponse} />
                </div>
            </div>
        </div>
    )
}
