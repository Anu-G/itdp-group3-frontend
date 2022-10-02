import './TimelineCard.css'
import React, { useEffect, useState } from 'react'
import { AvatarSmall } from '../../shared/components/Avatar/Avatar'
import { Caption, Text32White, Title3White } from '../../shared/components/Label/Label'
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
import AppError, { AppErrorAuth } from '../../utils/AppErrors'
import { PostOption } from '../PostOption/PostOption'
import { useParams } from 'react-router'
import { PanicPopUpScreen } from '../../shared/components/PopUpScreen/PopUpScreen'

library.add(fas)
library.add(far)

export const TimelineCard = ({ avatar, name, place, caption, links, time, date, comments, handleClick, feedId, postLikes, detailPostLikes = [], setRefresh, accId, handleClickName, handleClickPicture, profileStatus = false, accountType }) => {
  // state
  const maxLength = 280
  const [isActive, setIsActive] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [comment, setComment] = useState('')
  const [isButtonSendActive, setIsButtonSendActive] = useState(false)
  const [readMore, setReadMore] = useState(true)
  const [openPostOption, setOpenPostOption] = useState({
    isOpen: false,
    type: ''
  })
  const { timelineService } = UseDep();
  const param = useParams();
  const authRed = useSelector(AuthSelector);
  const [isLoadingComment, setLoadingComment] = useState(false);
  const [panic, setPanic] = useState({ isPanic: false, errMsg: '' });

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
      accId: authRed.account_id,
      comment: comment
    })
    setComment('')
  }

  const handleComment = async (detailComment) => {
    try {
      setLoadingComment(true)
      const response = await timelineService.doPostComment({
        feed_id: `${detailComment.feedId}`,
        account_id: `${detailComment.accId}`,
        comment_fill: detailComment.comment
      })
      if (response.data.data !== null) {
        setRefresh(`${detailComment.feedId}`)
      }
    } catch (err) {
      if (AppErrorAuth(err)) {
        setPanic(prevState => ({
          ...prevState,
          isPanic: true, errMsg: AppErrorAuth(err)
        }));
      }
    } finally {
      setLoadingComment(false)
    }
  }

  const handleLike = async () => {
    try {
      if (isLiked) {
        await timelineService.doDeleteTimelineLike({
          "account_id": `${authRed.account_id}`,
          "feed_id": `${feedId}`
        })
        setIsLiked(prevState => false)
        setRefresh(`${feedId}`)
      } else {
        await timelineService.doPostTimelineLike({
          "account_id": `${authRed.account_id}`,
          "feed_id": `${feedId}`
        })
        setIsLiked(prevState => true)
        setRefresh(`${feedId}`)
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

  const handleOpenOptions = () => {
    if (profileStatus && !param.accId) {
      setOpenPostOption(prevState => ({
        ...prevState,
        isOpen: true, type: 'admin'
      }))
    } else {
      setOpenPostOption(prevState => ({
        ...prevState,
        isOpen: true, type: ''
      }))
    }
  }

  const handleCloseOptions = () => {
    setOpenPostOption(prevState => ({
      ...prevState,
      isOpen: false, type: ''
    }))
  }

  const onClickPictrue = () => {
    if (handleClickPicture) {
      handleClickPicture(feedId);
    }
  }

  const onClickPanic = (value) => {
    setPanic(prevState => ({
      ...prevState,
      isPanic: value, errMsg: ''
    }));
  }

  //additional
  const [isBusiness, setIsBusiness] = useState(false)

  return (
    <>
      <div className={`timeline-wrp ${isLoadingComment && 'loading-div'}`}>
        <div className='timeline-ctn'>
          <div>
            <div className='profile-hd'>

              <AvatarSmall link={avatar} accId={accId} accType={accountType} handleClick={handleClickName} />
              {/* lempar type account nya */}
              <NameLocation name={name} place={place} accId={accId} accType={accountType} handleClick={handleClickName} isBusiness={accountType === 2} />

            </div>
            <div className='right-btn-ctn'>


              <div className='option-btn' onClick={handleOpenOptions}>
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
            {/* <Caption text={caption} readMore={readMore} handleReadmore={handleReadMore} /> */}
            <Title3White title={caption} />
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

              <div className='bottom-btn' onClick={() => authRed.token !== '' ? handleLike() : null}>

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
            {isActive ? <CommentExtActive comments={comments} handleCommentChange={handleCommentChange} value={comment} isButtonSendActive={isButtonSendActive} buttonLabel={'Send'} handleOnClickSend={handleOnClickSend} charLength={comment.length} maxLength={280} isLoading={isLoadingComment} isLogin={authRed.token !== '' ? true : false} /> : ''}
          </div>
        </div>
        <PostOption feedId={feedId} prevCaption={caption} prevImage={links} openPostOption={openPostOption.isOpen} handleOpenOptions={handleOpenOptions} handleCloseOptions={handleCloseOptions} setRefresh={setRefresh} type={openPostOption.type} />
      </div>
      {panic.isPanic && <PanicPopUpScreen onClickAnywhere={onClickPanic} errMsg={panic.errMsg} />}
    </>
  )
}

const CommentExtActive = ({ comments, handleCommentChange, maxLength, charLength, value, isButtonSendActive, buttonLabel, handleOnClickSend, isLoading, isLogin }) => {
  return (
    <div className='ext-cmt'>
      {comments == null ? '' : <CommentExtends comments={comments} />}
      {isLogin && <>
        <CommentColomn handleChange={handleCommentChange} maxLength={maxLength} charLength={charLength} value={value} />
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <ButtonComponentSm isDisable={!isButtonSendActive} label={buttonLabel} onClick={handleOnClickSend} isLoading={isLoading} />
        </div>
      </>}
    </div>
  )
}