import React, { useEffect, useState } from 'react'
import { ProgressBar } from 'react-bootstrap'
import { ButtonComponent } from '../../shared/components/Button/Button'
import { CommentColomn } from '../../shared/components/CommentColomn/CommentColomn'
import { InputTextLabelLg, InputTextLabelMd, InputTextLabelSm } from '../../shared/components/InputWithLabel/InputWithLabel'
import { Title2Yellow, Title3White } from '../../shared/components/Label/Label'
import './SettingsAddProduct.css'
import _ from 'lodash';

export const SettingsAddProduct = (props) => {
    const maxLength = 280

    const [isActive, setIsActive] = useState(true)
    const [description, setDescription] = useState('')
    const [isButtonUploadActive, setIsButtonUploadActive] = useState(false)

    useEffect(() => {
        if (description.length == 0) {
            setIsButtonUploadActive(false)
        } else if (description.length > maxLength) {
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

    let { id, label, uploadUrl } = props;
    const [isUploding, setUploding] = useState(false);
    const [uploadedImgs, setUplodedImgs] = useState([]);
    const [uploadProgress, setProgress] = useState(0);

    const handleChange = async e => {
        let { files } = e.target;

        let formData = new FormData();
        _.forEach(files, file => {
            formData.append('files', file);
        });

        // setUploding(true);
        // let { data } = await API.post(uploadUrl, formData, {
        //     onUploadProgress: ({ loaded, total }) => {
        //         let progress = ((loaded / total) * 100).toFixed(2);
        //         setProgress(progress);
        //     }
        // });
        // setUplodedImgs(data);
        // setUploding(false);
    }

    return (
        <div className='wrapper'>
            <Title2Yellow title={"New Product"} />
            <div className='settings-add-product-card'>
                <div className='name-price'>
                    <InputTextLabelSm label={'Name'} style={{ minWidth: '254px' }} />
                    <InputTextLabelSm label={'Price'} style={{ minWidth: '254px' }} />
                </div>

                <div className='description'>
                    <CommentColomn label='Description' handleChange={handleDescriptionChange} maxLength={maxLength} value={description} />
                </div>

                <div className='add-photo-video'>
                    <Title3White title={"Add Photos/ Video"} />
                    <div className="form-upload">
                        <label htmlFor={id} className="text-primary font-weight-bold">{label}</label>
                        <div className="d-flex">
                            <div className="d-flex">
                                <input multiple className="file-input" type="file" id={id} onChange={handleChange} />
                            </div>
                            {/* {
                              isUploding ? (
                                  <div className="flex-grow-1 px-2">
                                      <div className="text-center">{uploadProgress}%</div>
                                      <ProgressBar value={uploadProgress} />
                                  </div>
                              ) : null
                          } */}
                        </div>
                        <div className="d-flex flex-wrap mt-4">
                            {
                                uploadedImgs && !isUploding ? (
                                    uploadedImgs.map(uploadedImg => (
                                        <img src={uploadedImg} key={uploadedImg} alt="UploadedImage" className="img-thumbnail img-fluid uploaded-img mr-2" />
                                    ))
                                ) : null
                            }
                        </div>
                    </div>
                </div>

                <div className='button-upload'>
                    <ButtonComponent isDisable={isButtonUploadActive} label={'Upload'} onClick={handleOnClickUpload} />
                </div>
            </div>
        </div>
    )
}
