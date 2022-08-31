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
import { LoadingScreen } from '../../shared/components/LoadingScreen/LoadingScreen';
import { PanicPopUpScreen, SuccessPopUpScreen } from '../../shared/components/PopUpScreen/PopUpScreen';

export const SettingsAddProduct = (props) => {
   const maxLength = 280

   let { id, label } = props;
   const inputRef = useRef();
   const [image, setImage] = useState(null);
   const triggerFileSelectPopup = () => inputRef.current.click();

   const [isLoading, setLoading] = useState(false);
   const [success, setSuccess] = useState(false);
   const [panic, setPanic] = useState({ isPanic: false, errMsg: '' });

   const fileObj = [];
   const [fileArray, setFileArray] = useState([]);
   const onSelectFile = (event) => {
      fileObj.push(event.target.files);
      let arr = [];
      for (let i = 0; i < fileObj[0].length; i++) {
         arr.push(URL.createObjectURL(fileObj[0][i]));
      }
      setFileArray(arr);
   };

   const [formData, setFormData] = useState({
      productName: "",
      price: "",
      description: ""
   });

   const [charLength, setCharLength] = useState(0);

   const [result, setResult] = useState(null);
   const productImageData = new FormData();
   const { productImageService, productService } = UseDep();
   const authRed = useSelector(AuthSelector);

   const saveResponse = async _ => {
      for (let i = 0; i < fileArray.length; i++) {
         let file = await fetch(fileArray[i]).then(r => r.blob()).then(blobFile => new File([blobFile], `${i}-productImage.jpg`, { type: "image/png" }));
         productImageData.append("product_images", file);
      }
      try {
         setLoading(true);
         const responseImage = await productImageService.doPostProductImage(productImageData);
         if (responseImage.status === 200) {
            try {
               const response = await productService.doPostProductData({
                  account_id: `${authRed.account_id}`,
                  product_name: formData.productName,
                  price: formData.price,
                  description: formData.description,
                  detail_media_products: responseImage.data.data.split(",")
               });
               if (response.status === 200) {
                  setSuccess(true);
               }
            } catch (err) {
               setPanic(prevState => ({
                  ...prevState,
                  isPanic: true, errMsg: AppError(err)
               }));
            }
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

   const onChangeProductName = (e) => {
      setFormData(prevState => ({
         ...prevState,
         productName: e.target.value
      }))
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
      <>
         <div className='wrapper'>
            <Title2Yellow title={"New Product"} />
            <div className='settings-add-product-card'>
               <div className='name-price'>
                  <InputTextLabelSm label={'Name'} id={"productName"} value={formData.productName} handleOnChange={onChangeProductName} style={{ minWidth: '254px' }} />
                  <InputTextLabelSm label={'Price'} id={"price"} value={formData.price} handleOnChange={onChangePrice} style={{ minWidth: '254px' }} />
               </div>

               <div className='description'>
                  <BioColomn label={'Description'} maxLength={maxLength} charLength={charLength} handleChange={onChangeDescription} charLimitHandle={charLimitHandle} value={formData.description} />
               </div>

               <div className='add-photo-video'>
                  <Title3White title={"Add Photos/ Video"} />
                  <div className="form-upload">
                     <label htmlFor={id} className="text-primary font-weight-bold">{label}</label>
                     <div className="d-flex">
                        <div className="d-flex">
                           <input multiple type="file" accept='image/*' ref={inputRef} style={{ display: "none" }} onChange={onSelectFile} name="fileName" />
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

         {isLoading && <LoadingScreen />}
         {success && <SuccessPopUpScreen onClickAnywhere={onClickSuccess} />}
         {panic.isPanic && <PanicPopUpScreen onClickAnywhere={onClickPanic} errMsg={panic.errMsg} />}
      </>
   )
}
