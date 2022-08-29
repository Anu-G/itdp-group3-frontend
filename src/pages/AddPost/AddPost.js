import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { ButtonComponent } from '../../shared/components/Button/Button'
import { CommentColomn } from '../../shared/components/CommentColomn/CommentColomn';
import { Title2White, Title3White } from '../../shared/components/Label/Label';
import { UseDep } from '../../shared/context/ContextDep';
import AppError from '../../utils/AppError';
import './AddPost.css'

export const AddPost = () => {
  const maxLength = 280
  const { addPostService } = UseDep();

  const [caption, setCaption] = useState('') 
  const handleCaptionChange = (event) => {
    setCaption(event.target.value)
  }

  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const handleUpload = async(event) => {
    event.preventDefault()
    try {
        const response = await addPostService.doPost({
          // "account_id":23,
          "caption_post":caption,
          // "media_links":[
          //     "",""
          // ]
        })
        console.log(response);
    } catch (err) {
        AppError(err)
    }
  }

  const Popup = props => {
    return (
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}><FontAwesomeIcon icon="fa-solid fa-xmark" /></span>
          {props.content}
        </div>
      </div>
    );
  };

  return (
    <div className='wrapper'>
      <ButtonComponent label={"Add Post"} value="Click to Open Popup" onClick={togglePopup}/>
      {isOpen && <Popup
      content={<>
        <Title2White title={"Add Post"}/>
        <div className='form'>
          <div className='add-photo-video-form'>
            <Title3White title={"Add Photos/Video"}/>
            <div className='file-input-card'>
            <input multiple className="file-input" type="file" />
            </div>
          </div>

          <div className='caption-form'>
            <Title3White title={"Caption"}/>
            <CommentColomn handleChange={handleCaptionChange} maxLength={maxLength} value={caption}/>
          </div>
        </div>
        
        <div className='button-upload'>
        <ButtonComponent label={"Upload"} onClick={handleUpload}/>
        </div>
        
      </>}
      handleClose={togglePopup}
    />}
    </div>
  )
}
