import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef } from 'react';
import { ButtonComponent } from '../../shared/components/Button/Button'
import { Title2White, Title3White } from '../../shared/components/Label/Label';
import { UseDep } from '../../shared/context/ContextDep';
import AppError from '../../utils/AppErrors';
import './EditPost.css'
import { useSelector } from 'react-redux';
import { AuthSelector } from '../../shared/selectors/Selectors';
import { CommentColomn } from '../../shared/components/CommentColomn/CommentColomn';
import { LoadingScreen } from '../../shared/components/LoadingScreen/LoadingScreen';
import { PanicPopUpScreen, SuccessPopUpScreen } from '../../shared/components/PopUpScreen/PopUpScreen';
import { ImagesViewAddPostOne, ImageViewAddPostMany } from '../../shared/components/ImagesViewAddPost/ImagesViewAddPost';

export const EditPost = ({ feedId, openEditPost, handleOpenEditPost, prevImage, prevCaption, setRefresh }) => {
  // state
  const maxLength = 280;
  const [caption, setCaption] = useState(prevCaption);
  const [charLength, setCharLength] = useState(0);
  const [fileObj, setFileObj] = useState([]);
  const [imagePreview, setImagePreview] = useState([...prevImage])
  const [imageHold, setImageHold] = useState([...prevImage])
  const [imageDelete, setImageDelete] = useState([])
  const inputRef = useRef();

  const triggerFileSelectPopup = () => inputRef.current.click();

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
    setCharLength(event.target.value.length);
  }

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

  // service
  const { postImageService, postService } = UseDep();

  const saveResponse = async _ => {
    try {
      setLoading(true);
      let imageSend = []
      if (imageHold.length > 0) {
        imageSend = [...imageHold]
      }
      if (fileObj.length > 0) {
        const responseImage = await postImageService.doPostImage(fileObj.map(data => data.file));
        imageSend = [...imageSend, ...responseImage]
      }
      try {
        const response = await postService.doEditData({
          "feed_ID": feedId,
          "caption_post": caption,
          "media_links": imageSend
        });
        if (imageDelete.length > 0) {
            try {
                const response2 = await postImageService.doDeleteImage({
                    url: imageDelete
                })
                if (response.status === 200) {
                    setSuccess(true);
                    setRefresh()
                }
            } catch (err) {
                console.error(err);
                setPanic(prevState => ({
                  ...prevState,
                  isPanic: true, errMsg: AppError(err)
                }));
                setRefresh()
            }
        } else {
            if (response.status === 200) {
                setSuccess(true);
                setRefresh()
            }
        }
      } catch (err) {
        console.error(err);
        setPanic(prevState => ({
          ...prevState,
          isPanic: true, errMsg: AppError(err)
        }));
      }
    } catch (err) {
      console.error(err);
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
        setFileObj(prevState => [...holdFileObjFront,...holdFileObjBack])
      } else {
        const holdImageSendFront = imageHold.slice(0, index - 1)
        const holdImageSendBack = imageHold.slice(index, imageHold.length)
        const holdImageDelete = imageHold.slice(index-1)
        setImageHold(prevState => [...holdImageSendFront,...holdImageSendBack])
        setImageDelete(prevState=>[...prevState,holdImageDelete])
      }
    }
  }

  return (
    <>
      {openEditPost &&
        <div className='editpost-wrp'>
          <div className="popup-box">
            <div className="box">
              <div className='add-post-title'>
                <Title2White title={"Edit Post"} />
                <div className='x-btn' onClick={handleOpenEditPost}>
                  <FontAwesomeIcon icon="fa-solid fa-xmark" style={{ height: '100%', color: '#FE5454' }} />
                </div>
              </div>
              <Title3White title={"Edit Photos/Videos"} />
              <div className='form'>
                <div className='edit-photo-video-form'>
                  {imagePreview.length > 0 ?
                    <div className='file-input-card-edit'>
                      {imagePreview.length !== 1
                        ? <ImageViewAddPostMany links={imagePreview} handleDelete={handleDelete} inputRef={inputRef} onSelectFile={onSelectFile} triggerFileSelectPopup={triggerFileSelectPopup} />
                        : <ImagesViewAddPostOne link={imagePreview} handleDelete={handleDelete} inputRef={inputRef} onSelectFile={onSelectFile} triggerFileSelectPopup={triggerFileSelectPopup} />}
                    </div>
                    :
                    <div className='file-input-card-edit'>
                      <input multiple type="file" accept='image/*,video/*' ref={inputRef} style={{ display: "none" }} onChange={onSelectFile} name="fileName" />
                      <button onClick={triggerFileSelectPopup} style={{ borderRadius: "8px" }}>Choose Image</button>
                    </div>
                  }
                </div>

                <div className='caption-form'>
                  <Title3White title={"Caption"} />
                  <CommentColomn placeholder={"Write caption here ..."} handleChange={handleCaptionChange} maxLength={maxLength} value={caption} charLength={charLength} />
                </div>
              </div>

              <div className='button-upload'>
                <ButtonComponent label={"Update"} onClick={saveResponse} />
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
