import './TimelineCard.css'

import React, { useEffect, useState } from 'react'
import { AvatarSmall } from '../../shared/components/Avatar/Avatar'
import { Caption, Text32White, Title3White, TitleWhite } from '../../shared/components/Label/Label'
import { NameLocation } from '../../shared/components/NameLocation/NameLocation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { ImagesViewTimeline, ImagesViewTimelineMany } from '../../shared/components/ImagesViewProfile/ImagesViewProfile'
import { far } from '@fortawesome/free-regular-svg-icons'
import { CommentColomn } from '../../shared/components/CommentColomn/CommentColomn'
import { ButtonComponent, ButtonComponentSm } from '../../shared/components/Button/Button'
import { CommentExtends } from '../../shared/components/CommentExtends/CommentExtends'
import { UseDep } from '../../shared/context/ContextDep'

library.add(fas)
library.add(far)

export const TimelineCard = ({ avatar, name, place, caption, links, time, date, comments }) => {

  const maxLength = 280

  const [isActive, setIsActive] = useState(false)
  const [comment, setComment] = useState('')
  const [isButtonSendActive, setIsButtonSendActive] = useState(false)
  const [readMore, setReadMore] = useState(true)

  useEffect(() => {
    if (comment.length == 0) {
      setIsButtonSendActive(false)
    } else if (comment.length > maxLength) {
      setIsButtonSendActive(false)
    } else {
      setIsButtonSendActive(true)
    }
  }, [comment])

  const handleReadMore = () => {
    setReadMore(!readMore)
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
      <div className='timeline-ctn'>
        <div>
          <div className='profile-hd'>

            <AvatarSmall link={avatar} />
            <div className='name-loc-ctn'>
              <NameLocation name={name} place={place} />
            </div>

          </div>
          <div className='option-btn'>

            <FontAwesomeIcon icon="fa-solid fa-ellipsis" style={{ height: '100%', color: '#f4f4f4' }} />

          </div>
        </div>

        <div className='caption-ctn'>
          <Caption text={caption} readMore={readMore} handleReadmore={handleReadMore} />
        </div>

        <>
          <div className='img-view-ctn'>
            {// cek image/video - cek konten > 1 / not
              typeof links !== 'string' ? <ImagesViewTimelineMany links={links} /> :
                <ImagesViewTimeline link={links} />
            }
          </div>
        </>

        <div className='bottom-ctn'>
          <div className='bottom-btn' onClick={handleCommentOnClick}>

            {!isActive ? <FontAwesomeIcon icon="fa-regular fa-comment-dots" style={{ height: '28px', color: '#F4F4F4' }} /> : <FontAwesomeIcon icon="fa-solid fa-comment-dots" style={{ height: '28px', color: '#F4F4F4' }} />}

            <div className='comment-count-ctn'>
              <Text32White text={comments == null ? 0 : comments.length} />
            </div>
          </div>

          <div className='time-date'>
            <Text32White text={`${time} \t\t ${date}`} />
          </div>
        </div>

        {isActive ? <CommentExtActive comments={comments} handleCommentChange={handleCommentChange} value={comment} isButtonSendActive={isButtonSendActive} buttonLabel={'Send'} handleOnclickSend={handleOnClickSend} /> : ''}


      </div>
    </div>
  )
}

const CommentExtActive = ({ comments, handleCommentChange, maxLength, value, isButtonSendActive, buttonLabel, handleOnClickSend }) => {
  return (
    <div className='ext-cmt'>
      {comments == null ? '' : <CommentExtends comments={comments} /> }
      <CommentColomn handleChange={handleCommentChange} maxLength={maxLength} value={value} />
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <ButtonComponentSm isDisable={!isButtonSendActive} label={buttonLabel} onClick={handleOnClickSend} />

      </div>
    </div>
  )
}