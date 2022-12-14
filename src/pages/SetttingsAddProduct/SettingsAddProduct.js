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
import AppError from '../../utils/AppErrors';
import { BioColomn } from '../../shared/components/BioColomn/BioColomn'
import { LoadingScreen } from '../../shared/components/LoadingScreen/LoadingScreen';
import { PanicPopUpScreen, SuccessPopUpScreen } from '../../shared/components/PopUpScreen/PopUpScreen';

export const SettingsAddProduct = (props) => {
   // state
   const maxLength = 280
   let { id, label } = props;
   const inputRef = useRef();
   const triggerFileSelectPopup = () => inputRef.current.click();
   const [fileObj, setFileObj] = useState([])
   const onSelectFile = (event) => {
      for (let i = 0; i < event.target.files.length; i++) {
         const newImage = event.target.files[i]
         newImage["id"] = Math.random()
         setFileObj((prevState) => [...prevState, newImage])
       }
   };
   const [formData, setFormData] = useState({
      productName: "",
      price: "",
      description: ""
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

   const charLimitHandle = (e) => {
      if (charLength >= maxLength) {
         e.preventDefault();
      }
   }

   // service
   const { productImageService, productService } = UseDep();
   const authRed = useSelector(AuthSelector);

   const saveResponse = async _ => {
      try {
         setLoading(true);
         let responseImage = await productImageService.doPostProductImage(fileObj);
         try {
            const response = await productService.doPostProductData({
               account_id: `${authRed.account_id}`,
               product_name: formData.productName,
               price: formData.price,
               description: formData.description,
               detail_media_products: responseImage
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
