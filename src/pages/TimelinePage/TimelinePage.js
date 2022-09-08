import './TimelinePage.css'
import React, { useEffect, useState } from 'react'
import { TimelineCard } from '../TimelineCard/TimelineCard'
import { UseDep } from '../../shared/context/ContextDep'
import { LoadingScreen } from '../../shared/components/LoadingScreen/LoadingScreen'
import { AppErrorAuth } from '../../utils/AppErrors'
import { PanicPopUpScreen } from '../../shared/components/PopUpScreen/PopUpScreen'
import { useNavigate } from 'react-router'

export const TimelinePage = ({ categoryId = null }) => {
  // state
  const [timelines, setTimelines] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId == null) {
      getTimeline()
    } else {
      getTimelineByCategory()
    }
  }, [categoryId])

  // service
  const { timelineService } = UseDep()

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
    navigate(`/profile/${accountId}`)
  }

  return (
    <>
      <div className='tl-bg'>
        <div className={categoryId ? 'tl-lst ctg' : 'tl-lst'}>
          {timelines.map((post, i) => {
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
                comments={post.detail_comments}
                date={`${date}/${month}/${year}`}
                links={post.detail_media_feed}
                name={post.display_name}
                place={post.place}
                time={`${hour}:${minutes}`}
                key={post.i}
                accId={post.account_id}
                handleClickName={handleClickName} />
            )
          })}
        </div>
      </div>

      {isLoading && <LoadingScreen />}
      {panic.isPanic && <PanicPopUpScreen onClickAnywhere={onClickPanic} errMsg={panic.errMsg} />}
    </>
  )
}
