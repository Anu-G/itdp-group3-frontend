import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { BioColomn } from '../../shared/components/BioColomn/BioColomn';
import { ButtonComponent } from '../../shared/components/Button/Button'
import { CommentColomn } from '../../shared/components/CommentColomn/CommentColomn';
import { Title2White, Title3White } from '../../shared/components/Label/Label';
import { UseDep } from '../../shared/context/ContextDep';
import AppError from '../../utils/AppError';
import './AddPost.css'

export const AddPost = ({ isOpen, togglePopup }) => {
  const maxLength = 280;
  const { addPostService } = UseDep();
  const [caption, setCaption] = useState('');
  const [charLength, setCharLength] = useState(0);

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
    setCharLength(event.target.value.length);
  }

  const charLimitHandle = (e) => {
    if (charLength >= maxLength) {
      e.preventDefault();
    }
  }

  const handleUpload = async (event) => {
    event.preventDefault()
    try {
      const response = await addPostService.doPost({
        // "account_id":23,
        "caption_post": caption,
        // "media_links":[
        //     "",""
        // ]
      })
    } catch (err) {
      AppError(err)
    }
  }

  return (
    <>
      {isOpen &&
        <div className='wrapper'>
          <div className="popup-box">
            <div className="box">
              <div className='add-post-title'>
                <Title2White title={"Add Post"} />
                <span className="close-icon" onClick={togglePopup}><FontAwesomeIcon icon="fa-solid fa-xmark" style={{ width: '32px', height: '32px' }} /></span>
              </div>
              <Title3White title={"Add Photos/Videos"} />
              <div className='form'>
                <div className='add-photo-video-form'>
                  <div className='file-input-card'>
                    <input multiple className="file-input" type="file" />
                  </div>
                </div>

                <div className='caption-form'>
                  <Title3White title={"Caption"} />
                  <CommentColomn placeholder={"Write caption here ..."} handleChange={handleCaptionChange} maxLength={maxLength} value={caption} charLength={charLength} charLimitHandle={charLimitHandle} />
                </div>
              </div>

              <div className='button-upload'>
                <ButtonComponent label={"Upload"} onClick={handleUpload} />
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
