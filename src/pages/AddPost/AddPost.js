import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef } from 'react';
import { BioColomn } from '../../shared/components/BioColomn/BioColomn';
import { ButtonComponent } from '../../shared/components/Button/Button'
import { Title2White, Title3White } from '../../shared/components/Label/Label';
import { UseDep } from '../../shared/context/ContextDep';
import AppError from '../../utils/AppError';
import './AddPost.css'
import { useSelector } from 'react-redux';
import { AuthSelector } from '../../shared/selectors/Selectors';
import { CommentColomn } from '../../shared/components/CommentColomn/CommentColomn';
import { LoadingScreen } from '../../shared/components/LoadingScreen/LoadingScreen';
import { PanicPopUpScreen, SuccessPopUpScreen } from '../../shared/components/PopUpScreen/PopUpScreen';

export const AddPost = ({ isOpen, togglePopup }) => {
  const maxLength = 280;
  const { addPostService } = UseDep();
  const [caption, setCaption] = useState('');
  const [charLength, setCharLength] = useState(0);
  const inputRef = useRef();
  const [image, setImage] = useState([]);
  const [result, setResult] = useState(null);
  const postImageData = new FormData();
  const { postImageService, postService } = UseDep();
  const authRed = useSelector(AuthSelector);

  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [panic, setPanic] = useState({ isPanic: false, errMsg: '' });

  const triggerFileSelectPopup = () => inputRef.current.click();

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
    setCharLength(event.target.value.length);
  }

  const charLimitHandle = (e) => {
    if (charLength >= maxLength) {
      e.preventDefault();
    }
  }

  const saveResponse = async _ => {
    for (let i = 0; i < fileArray.length; i++) {
      let file = await fetch(fileArray[i]).then(r => r.blob()).then(blobFile => new File([blobFile], `${i}-feedImage.jpg`, { type: "image/png" }));
      postImageData.append("feed_images", file);
    }
    try {
      setLoading(true);
      const responseImage = await postImageService.doPostImage(postImageData);
      if (responseImage.status === 200) {
        try {
          const response = await postService.doPostData({
            account_id: authRed.account_id,
            caption_post: caption,
            media_links: responseImage.data.data
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

  const onClickSuccess = (value) => {
    setSuccess(current => value);
  }

  const onClickPanic = (value) => {
    setPanic(prevState => ({
      ...prevState,
      isPanic: value, errMsg: ''
    }));
  }

  const fileObj = [];
  const [fileArray, setFileArray] = useState([]);
  const onSelectFile = (event) => {
    fileObj.push(event.target.files);
    let arr = [];
    for (let i = 0; i < fileObj[0].length; i++) {
      arr.push(URL.createObjectURL(fileObj[0][i]));
    }
    setFileArray(arr);
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
                    <input multiple type="file" accept='image/*,video/*' ref={inputRef} style={{ display: "none" }} onChange={onSelectFile} name="fileName" />
                    <button onClick={triggerFileSelectPopup} style={{ borderRadius: "8px" }}>Choose Image</button>
                  </div>
                </div>

                <div className='caption-form'>
                  <Title3White title={"Caption"} />
                  <CommentColomn placeholder={"Write caption here ..."} handleChange={handleCaptionChange} maxLength={maxLength} value={caption} charLength={charLength} charLimitHandle={charLimitHandle} />
                </div>
              </div>

              <div className='button-upload'>
                <ButtonComponent label={"Upload"} onClick={saveResponse} />
              </div>
            </div>
          </div>
        </div>
      }

      {isLoading && <LoadingScreen />}
      {success && <SuccessPopUpScreen onClickAnywhere={onClickSuccess} />}
      {panic.isPanic && <PanicPopUpScreen onClickAnywhere={onClickPanic} errMsg={panic.errMsg} />}
    </>
  )
}
