import React, { useEffect, useState } from 'react'
import { BioColomn } from '../../shared/components/BioColomn/BioColomn'
import { ButtonComponent } from '../../shared/components/Button/Button'
import { CommentColomn } from '../../shared/components/CommentColomn/CommentColomn'
import { InputTextLabelLg, InputTextLabelMd, InputTextLabelSm } from '../../shared/components/InputWithLabel/InputWithLabel'
import { Title2Yellow, Title3White } from '../../shared/components/Label/Label'
import './SettingsAddProduct.css'

export const SettingsAddProduct = () => {
    const maxLength = 280

    const [isActive, setIsActive] = useState(true)
    const [description, setDescription] = useState('') 
    const [isButtonUploadActive, setIsButtonUploadActive] = useState(false)

    useEffect(()=>{
      if (description.length == 0){
        setIsButtonUploadActive(false)
      } else if (description.length > maxLength){
        setIsButtonUploadActive(false)
      } else {
        setIsButtonUploadActive(true)
      }
    }, [description])

    const handleDescriptionOnClick = () => {
      setIsActive(!isActive)
    }

    const handleDescriptionChange = (event) => {
      setDescription(event.target.value)
    }

    const handleOnClickUpload = () => {
        console.log('ceritanya send')
      }

  return (
    <div className='wrapper'>
        <Title2Yellow title={"New Product"}/>
        <div className='settings-add-product-card'>
            <div className='name-price'>
                    <InputTextLabelSm label={'Name'} style={{minWidth:'254px'}}/>
                    <InputTextLabelSm label={'Price'} style={{minWidth:'254px'}}/>
            </div>

            <div className='description'>
                <CommentColomn label='Description' handleChange={handleDescriptionChange} maxLength={maxLength} value={description}/>
            </div>

            <div className='add-photo-video'>
                <Title3White title={"Add Photos/ Video"}/>
            </div>

            <div className='button-upload'>
                <ButtonComponent isDisable={isButtonUploadActive} label={'Upload'} onClick={handleOnClickUpload}/>
            </div>
        </div>
    </div>
  )
}
