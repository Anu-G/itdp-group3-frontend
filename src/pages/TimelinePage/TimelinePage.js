import './TimelinePage.css'

import React, { useEffect, useState } from 'react'
import { TimelineCard } from '../TimelineCard/TimelineCard'
import { UseDep } from '../../shared/context/ContextDep'
import { LoadingScreen } from '../../shared/components/LoadingScreen/LoadingScreen'

export const TimelinePage = ({ categoryActive = false, categoryId = null }) => {

  const { timelineService } = UseDep()
  const [timelines, setTimelines] = useState([])

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (categoryId == null) {
      getTimeline()
    } else {
      getTimelineByCategory()
    }
  }, [categoryId])

  const getTimeline = async () => {
    try {
      setLoading(true);
      const response = await timelineService.doGetTimeline({
        page: 1,
        page_lim: 200
      })
      setTimelines(response.data.data)
    } catch (err) {
      console.error(err);
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
      setTimelines(response.data.data)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
                key={post.i} />
            )
          })}
        </div>
      </div>

      {isLoading && <LoadingScreen />}
    </>
  )
}
