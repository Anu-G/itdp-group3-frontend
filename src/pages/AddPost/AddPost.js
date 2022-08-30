import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef } from 'react';
import { ButtonComponent } from '../../shared/components/Button/Button'
import { Title2White, Title3White } from '../../shared/components/Label/Label';
import { UseDep } from '../../shared/context/ContextDep';
import AppError from '../../utils/AppError';
import './AddPost.css'
import { useSelector } from 'react-redux';
import { AuthSelector } from '../../shared/selectors/Selectors';
import { BioColomn } from '../../shared/components/BioColomn/BioColomn';

export const AddPost = () => {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
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

  const inputRef = useRef();
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
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
    caption: ""
 });
 const [charLength, setCharLength] = useState(0);
 const maxLength = 280;
 const postImageData = new FormData();
 const { postImageService, postService } = UseDep();
 const authRed = useSelector(AuthSelector);

 const saveResponse = async _ => {
    let file = await fetch(result).then(r => r.blob()).then(blobFile => new File([blobFile], "imagePost.jpg", { type: "image/png" }));
    postImageData.append("media_links", file);

    try {
       const responseImage = await postImageService.doPostImage(postImageData);
       if (responseImage.status === 200) {
          try {
             const response = await postService.doPost({
                account_id: `${authRed.account_id}`,
                media_links: [
                  responseImage.data.data
              ],
                caption: formData.caption
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

 const onChangeCaption = (event) => {
    setFormData(prevState => ({
       ...prevState,
       caption: event.target.value
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
      <ButtonComponent label={"Add Post"} value="Click to Open Popup" onClick={togglePopup}/>
      {isOpen && <Popup
      content={<>
        <Title2White title={"Add Post"}/>
        <div className='form'>
          <div className='add-photo-video-form'>
            <Title3White title={"Add Photos/Video"}/>
            <div className='file-input-card'>
            <input multiple type="file" accept='image/*' ref={inputRef} style={{ display: "none" }} onChange={onSelectFile} name="fileName" />
            <button onClick={triggerFileSelectPopup} style={{ borderRadius: "8px" }}>Choose Image</button>
            </div>
          </div>

          <div className='caption-form'>
            {/* <Title3White title={"Caption"}/> */}
            <BioColomn label={"Caption"} maxLength={maxLength} charLength={charLength} handleChange={onChangeCaption} charLimitHandle={charLimitHandle} value={formData.caption} />
          </div>
        </div>
        
        <div className='button-upload'>
        <ButtonComponent label={"Upload"} onClick={saveResponse}/>
        </div>
        
      </>}
      handleClose={togglePopup}
    />}
    </div>
  )
}
