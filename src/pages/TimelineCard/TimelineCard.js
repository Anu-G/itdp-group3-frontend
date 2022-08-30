import './TimelineCard.css'

import React, { useEffect, useState } from 'react'
import { AvatarSmall } from '../../shared/components/Avatar/Avatar'
import { Title3White, TitleWhite } from '../../shared/components/Label/Label'
import { NameLocation } from '../../shared/components/NameLocation/NameLocation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { ImagesViewTimeline } from '../../shared/components/ImagesViewProfile/ImagesViewProfile'
import { far } from '@fortawesome/free-regular-svg-icons'
import { CommentColomn } from '../../shared/components/CommentColomn/CommentColomn'
import { ButtonComponent } from '../../shared/components/Button/Button'
import { UseDep } from '../../shared/context/ContextDep'


library.add(fas)
library.add(far)

export const TimelineCard = () => {

    // const imgsrc = 'https://cms-assets.tutsplus.com/cdn-cgi/image/width=630/uploads/users/1223/posts/32827/image/Cafe%20Logo%20Maker%20for%20Coffee%20and%20Tea%20Designs_.jpg';
    // const name = 'Cafe XYZ';
    // const place = 'Ragunan, Jakarta Selatan'
    // const ctnsrc = 'https://asset.kompas.com/crops/gsIqLl4O-rNNCt-MiaH40ztt5sk=/0x76:4032x2764/375x240/data/photo/2021/09/11/613c98c27631e.jpg'
    // const time = '11.30'
    // const date = '24/08/2022'

    const {timelineService} = UseDep()
    const [timelines, setTimelines] = useState([])

    const maxLength = 280

    const [isActive, setIsActive] = useState(true)
    const [comment, setComment] = useState('') 
    const [isButtonSendActive, setIsButtonSendActive] = useState(false)

    useEffect(() => {
      getTimeline()
    }, [])

    useEffect(()=>{
      if (comment.length == 0){
        setIsButtonSendActive(false)
      } else if (comment.length > maxLength){
        setIsButtonSendActive(false)
      } else {
        setIsButtonSendActive(true)
      }
    }, [comment])

    const getTimeline = async () => {
      try {
        const response = await timelineService.doGetTimeline()
        setTimelines(response.data.data)
      } catch (err) {
        if (err.response.data.responseCode === 'X01') {
          alert('please complete your profile data first')
       } else {
          if (err.response.status !== 400) {
              alert(err.message);
           } else {
              alert(err.response.data.responseMessage);
           }
       }
      }
    }

    const handleCommentOnClick = () => {
      setIsActive(!isActive)
    }

    const handleCommentChange = (event) => {
      setComment(event.target.value)
    }

    const handleOnClickSend = () => {
      console.log('ceritanya send')
    }


  return (
    <div className='timeline-wrp'>
      {timelines.map(timeline => {
        let dt = new Date(timeline.CreatedAt.replace(' ', 'T'));
        let date = dt.getDate()
        let month = dt.getMonth() + 1
        let year = dt.getFullYear()
        let hour = dt.getHours()
        let minutes = dt.getMinutes()
        return (
            <div className='timeline-ctn'>
            <div>
              <div className='profile-hd'>

                <AvatarSmall link={timeline.profile_image}/>
                <div className='name-loc-ctn'>
                    <NameLocation name={timeline.account_id} place={"Indonesia"}/>
                </div>

              </div>
              <div className='option-btn'>
                
                <FontAwesomeIcon icon="fa-solid fa-ellipsis" style={{height: '100%', color:'#f4f4f4'}}/>
                
              </div>
            </div>

            <>
              <div className='img-view-ctn'>
                <ImagesViewTimeline link={timeline.detail_media_feeds}/>
              </div>
            </>
              
            <div className='bottom-ctn'>
              <div className='bottom-btn'  onClick={handleCommentOnClick}>

                {isActive ? <FontAwesomeIcon icon="fa-regular fa-comment-dots" style={{height:'48px', color:'#F4F4F4'}}/> : <FontAwesomeIcon icon="fa-solid fa-comment-dots" style={{height:'48px', color:'#F4F4F4'}} />}
              </div>

              <Title3White title={`${hour}:${minutes}    \t\t\t ${date}/${month}/${year}`}/>
            </div>

            <div className='ext-cmt' hidden={isActive}>
              <CommentColomn handleChange={handleCommentChange} maxLength={maxLength} value={comment}/>
              <div style={{display:'flex', justifyContent:'end'}}>
                <ButtonComponent isDisable={isButtonSendActive} label={'send'} onClick={handleOnClickSend}/>

              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
