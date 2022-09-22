import './TimelinePage.css'
import React, { useEffect, useState } from 'react'
import { TimelineCard } from '../TimelineCard/TimelineCard'
import { UseDep } from '../../shared/context/ContextDep'
import { AppErrorAuth } from '../../utils/AppErrors'
import { PanicPopUpScreen } from '../../shared/components/PopUpScreen/PopUpScreen'
import { useNavigate } from 'react-router'
import { AuthSelector } from '../../shared/selectors/Selectors'
import { useSelector } from 'react-redux'
import SkeletonTimelineCard from '../../shared/components/Skeletons/SkeletonTimelineCard'
import { DetailPostCard } from '../DetailPostCard/DetailPostCard'

export const TimelinePage = ({ categoryId = null }) => {
  // state
  const [timelines, setTimelines] = useState([])
  const navigate = useNavigate();
  const authRed = useSelector(AuthSelector);
  const [detailPost, setDetailPost] = useState({
    isActive: false,
    id: 0,
  })

  useEffect(() => {
    if (categoryId == null) {
      getTimeline()
    } else {
      getTimelineByCategory()
    }
  }, [categoryId])

  // service
  const { timelineService, postService } = UseDep();

  const setRefresh = async (postId) => {
    try {
      const response = await postService.doGetDataById({
        "feed_id": postId,
        "page": 1,
        "page_lim": 1,
      })
      let refreshTimeline = [...timelines]
      let i = timelines.findIndex(val => val.post_id == parseInt(postId))
      refreshTimeline[i] = response.data.data
      setTimelines(refreshTimeline)
    } catch (err) {
      console.log(err);
    }
  }

  const getTimeline = async () => {
    try {
      setLoading(true);
      const response = await timelineService.doGetTimeline({
        page: 1,
        page_lim: 200
      })
      if (response.data.data !== null) {
        setTimelines(response.data.data)
      }
    } catch (err) {
      if (AppErrorAuth(err)) {
        setPanic(prevState => ({
          ...prevState,
          isPanic: true, errMsg: AppErrorAuth(err)
        }));
      }
    } finally {
      setLoading(false);
    }
  }

  const getTimelineByCategory = async () => {
    try {
      setLoading(true);
      const response = await timelineService.doGetTimelineByCategory({
        category: categoryId,
        page: 1,
        page_lim: 200
      })
      if (response.data.data !== null) {
        setTimelines(response.data.data)
      }
    } catch (err) {
      if (AppErrorAuth(err)) {
        setPanic(prevState => ({
          ...prevState,
          isPanic: true, errMsg: AppErrorAuth(err)
        }));
      }
    } finally {
      setLoading(false);
    }
  }

  // screen
  const [isLoading, setLoading] = useState(false);
  const [panic, setPanic] = useState({ isPanic: false, errMsg: '' });

  const onClickPanic = (value) => {
    setPanic(prevState => ({
      ...prevState,
      isPanic: value, errMsg: ''
    }));
  }

  const handleClickName = (accountId) => {
    if (accountId == authRed.account_id) {
      navigate('/profile')
    } else {
      navigate(`/account/${accountId}`)
    }
  }

  const handleClosePicture = () => {
    setDetailPost({
      isActive: false,
      id: 0
    })
  }

  const handleClickPicture = (value) => {
    window.history.pushState(null, null, `/p/${value}`)
    setDetailPost({
      isActive: true,
      id: value
    });
  }

  return (
    <>
      <div className='tl-bg'>
        <div className={categoryId ? 'tl-lst ctg' : 'tl-lst'}>
          {!isLoading && timelines.map((post, i) => {
            let dt = new Date(post.created_at.replace(' ', 'T'));
            let date = dt.getDate()
            let month = dt.getMonth() + 1
            let year = dt.getFullYear()
            let hour = (dt.getHours() < 10 ? '0' : '') + dt.getHours()
            let minutes = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes()
            return (
              <TimelineCard
                avatar={post.avatar}
                caption={post.caption_post}
                comments={post.detail_comment}
                date={`${date}/${month}/${year}`}
                links={post.detail_media_feed}
                name={post.display_name}
                place={post.place}
                time={`${hour}:${minutes}`}
                key={post.i}
                postLikes={post.total_like}
                detailPostLikes={post.detail_like}
                setRefresh={setRefresh}
                accId={post.account_id}
                handleClickName={handleClickName}
                feedId={post.post_id}
                handleClickPicture={handleClickPicture}
              />
            )
          })}
          {isLoading &&
            <>
              <SkeletonTimelineCard />
              <SkeletonTimelineCard />
            </>}
        </div>
      </div>

      {/* {detailPost.isActive && <DetailPostCard postIdFeed={detailPost.id} handleClosePicture={handleClosePicture} />} */}
      {panic.isPanic && <PanicPopUpScreen onClickAnywhere={onClickPanic} errMsg={panic.errMsg} />}
    </>
  )
}
