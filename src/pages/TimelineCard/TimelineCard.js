import './TimelineCard.css'
import React, { useEffect, useState } from 'react'
import { AvatarSmall } from '../../shared/components/Avatar/Avatar'
import { Caption, Text32White } from '../../shared/components/Label/Label'
import { NameLocation } from '../../shared/components/NameLocation/NameLocation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { ImagesViewTimeline, ImagesViewTimelineMany } from '../../shared/components/ImagesViewProfile/ImagesViewProfile'
import { far } from '@fortawesome/free-regular-svg-icons'
import { CommentColomn } from '../../shared/components/CommentColomn/CommentColomn'
import { ButtonComponentSm } from '../../shared/components/Button/Button'
import { CommentExtends } from '../../shared/components/CommentExtends/CommentExtends'
import { UseDep } from '../../shared/context/ContextDep'
import { useSelector } from 'react-redux'
import { AuthSelector } from '../../shared/selectors/Selectors'
import AppError from '../../utils/AppErrors'

library.add(fas)
library.add(far)

export const TimelineCard = ({ avatar, name, place, caption, links, time, date, comments, handleClick, feedId, handleComment, postLikes, detailPostLikes = [], setRefresh, accId, handleClickName }) => {
  // state
  const maxLength = 280
  const [isActive, setIsActive] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [comment, setComment] = useState('')
  const [isButtonSendActive, setIsButtonSendActive] = useState(false)
  const [readMore, setReadMore] = useState(true)
  const { timelineService } = UseDep();
  const authRed = useSelector(AuthSelector)

  useEffect(() => {
    if (comment.length == 0) {
      setIsButtonSendActive(false)
    } else if (comment.length > maxLength) {
      setIsButtonSendActive(false)
    } else {
      setIsButtonSendActive(true)
    }
  }, [comment])

  useEffect(() => {
    if (detailPostLikes != null) {
      for (const like of detailPostLikes) {
        if (like.account_id == authRed.account_id) {
          setIsLiked(prevState => true)
          break
        }
      }
    }
  }, [])

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
    handleComment({
      feedId: feedId,
      comment: comment
    })
    setComment('')
    // console.log('ceritanya send')
  }

  const handleLike = async () => {
    try {
      if (isLiked) {
        await timelineService.doDeleteTimelineLike({
          "account_id": authRed.account_id,
          "feed_id": feedId
        })
        setIsLiked(prevState => false)
        setRefresh(prevState => !prevState)
      } else {
        await timelineService.doPostTimelineLike({
          "account_id": authRed.account_id,
          "feed_id": feedId
        })
        setIsLiked(prevState => true)
        setRefresh(prevState => !prevState)
      }
    } catch (e) {
      AppError(e);
    }
  }

  const handleDoubleClickImage = (event) => {
    switch (event.detail) {
      case 2:
        handleLike();
      default:
    }
  }

  return (
    <div className='timeline-wrp'>
      <div className='timeline-ctn'>
        <div>
          <div className='profile-hd'>

            <AvatarSmall link={avatar} accId={accId} handleClick={handleClickName} />
            <div className='name-location-ctn'>
              <NameLocation name={name} place={place} accId={accId} handleClick={handleClickName} />
            </div>

          </div>
          <div className='right-btn-ctn'>


            <div className='option-btn'>

              <FontAwesomeIcon icon="fa-solid fa-ellipsis" style={{ height: '100%', color: '#f4f4f4' }} />

            </div>

            {handleClick != null ?
              <div className='x-btn' onClick={handleClick}>
                <FontAwesomeIcon icon="fa-solid fa-xmark" style={{ height: '100%', color: '#FE5454' }} />
              </div>
              : ''}
          </div>
        </div>

        <div className='caption-ctn'>
          <Caption text={caption} readMore={readMore} handleReadmore={handleReadMore} />
        </div>

        <>
          <div className='img-view-ctn'>
            {Array.isArray(links) && links.length !== 1 ? <ImagesViewTimelineMany links={links} /> : <ImagesViewTimeline link={links} />}
          </div>
        </>

        <div className='bottom-ctn'>
          <div className='bottom-like-comment-ctn'>
            <div className='bottom-btn' onClick={handleCommentOnClick}>

              {!isActive ? <FontAwesomeIcon icon="fa-regular fa-comment-dots" style={{ height: '28px', color: '#F4F4F4' }} /> : <FontAwesomeIcon icon="fa-solid fa-comment-dots" style={{ height: '28px', color: '#F4F4F4' }} />}

              <div className='comment-count-ctn'>
                <Text32White text={comments == null ? 0 : comments.length} />
              </div>
            </div>

            <div className='bottom-btn' onClick={() => handleLike()}>

              {!isLiked ? <FontAwesomeIcon icon="fa-regular fa-heart" style={{ height: '28px', color: '#F4F4F4' }} /> : <FontAwesomeIcon icon="heart" style={{ height: '28px', color: '#F4F4F4' }} />}

              <div className='like-count-ctn'>
                <Text32White text={postLikes == null ? 0 : postLikes} />
              </div>
            </div>
          </div>

          <div className='time-date'>
            <Text32White text={`${time} \t\t ${date}`} />
          </div>
        </div>

        <div className='comment-ssn'>
          {isActive ? <CommentExtActive comments={comments} handleCommentChange={handleCommentChange} value={comment} isButtonSendActive={isButtonSendActive} buttonLabel={'Send'} handleOnClickSend={handleOnClickSend} maxLength={280} /> : ''}
        </div>

      </div>
    </div>
  )
}

const CommentExtActive = ({ comments, handleCommentChange, maxLength, value, isButtonSendActive, buttonLabel, handleOnClickSend }) => {
  return (
    <div className='ext-cmt'>
      {comments == null ? '' : <CommentExtends comments={comments} />}
      <CommentColomn handleChange={handleCommentChange} maxLength={maxLength} value={value} />
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <ButtonComponentSm isDisable={!isButtonSendActive} label={buttonLabel} onClick={handleOnClickSend} />

      </div>
    </div>
  )
}