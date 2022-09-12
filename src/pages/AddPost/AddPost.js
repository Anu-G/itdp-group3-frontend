import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef } from 'react';
import { ButtonComponent } from '../../shared/components/Button/Button'
import { Title2White, Title3White } from '../../shared/components/Label/Label';
import { UseDep } from '../../shared/context/ContextDep';
import AppError from '../../utils/AppErrors';
import './AddPost.css'
import { useSelector } from 'react-redux';
import { AuthSelector } from '../../shared/selectors/Selectors';
import { CommentColomn } from '../../shared/components/CommentColomn/CommentColomn';
import { LoadingScreen } from '../../shared/components/LoadingScreen/LoadingScreen';
import { PanicPopUpScreen, SuccessPopUpScreen } from '../../shared/components/PopUpScreen/PopUpScreen';
import { ImagesViewTimeline, ImagesViewTimelineMany } from '../../shared/components/ImagesViewProfile/ImagesViewProfile';
import { ImagesViewAddPost, ImagesViewAddPostOne, ImageViewAddPostMany } from '../../shared/components/ImagesViewAddPost/ImagesViewAddPost';

export const AddPost = ({ isOpen, togglePopup }) => {
  // state
  const maxLength = 280;
  const [caption, setCaption] = useState('');
  const [charLength, setCharLength] = useState(0);
  const [fileObj, setFileObj] = useState([])
  const inputRef = useRef();

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

  const onSelectFile = (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[i])
      reader.addEventListener('load',()=>{
        setFileObj((prevState)=>[...prevState,reader.result])
      })
      // const newImage = event.target.files[i]
      // newImage["id"] = Math.random()
      // setFileObj((prevState) => [...prevState, reader.result])
    }
  }

  // service
  const { postImageService, postService } = UseDep();
  const authRed = useSelector(AuthSelector);

  const saveResponse = async _ => {
    try {
      setLoading(true);
      const responseImage = await postImageService.doPostImage(fileObj);
      try {
        const response = await postService.doPostData({
          account_id: authRed.account_id,
          caption_post: caption,
          media_links: responseImage
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

  const handleDelete = (index) => {
    if (fileObj.length == 1) {
      setFileObj(prevState=>[])
    } else {
      const holdFileObjFront = fileObj.slice(0,index-1);
      const holdFileObjBack = fileObj.slice(index,fileObj.length)
      setFileObj(prevState=>[...holdFileObjFront,...holdFileObjBack])
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
                  {fileObj.length>0 ? 
                    <div className='file-input-card'>
                      {fileObj.length !== 1 
                      ? <ImageViewAddPostMany links={fileObj} handleDelete={handleDelete} inputRef={inputRef} onSelectFile={onSelectFile} triggerFileSelectPopup={triggerFileSelectPopup} /> 
                      : <ImagesViewAddPostOne link={fileObj} handleDelete={handleDelete} inputRef={inputRef} onSelectFile={onSelectFile} triggerFileSelectPopup={triggerFileSelectPopup}/>}
                    </div>
                  :
                    <div className='file-input-card'>
                      <input multiple type="file" accept='image/*,video/*' ref={inputRef} style={{ display: "none" }} onChange={onSelectFile} name="fileName" />
                      <button onClick={triggerFileSelectPopup} style={{ borderRadius: "8px" }}>Choose Image</button>
                    </div>
                  }
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
