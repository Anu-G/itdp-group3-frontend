import './TimelinePage.css'

import React, { useEffect, useState } from 'react'
import { TimelineCard } from '../TimelineCard/TimelineCard'
import { UseDep } from '../../shared/context/ContextDep'

export const TimelinePage = ({categoryActive=false, categoryId=''}) => {

  const { timelineService } = UseDep()
  const [timelines, setTimelines] = useState([])

  useEffect(() => {
    getTimeline()
  }, [])

  const getTimeline = async () => {
    try {
      const response = await timelineService.doGetTimeline({
        page: 1,
        page_lim: 10
      })
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

  return (
    <div className='tl-bg'>
        <div className={categoryId ? 'tl-lst ctg' : 'tl-lst'}>
          {timelines.map((post)=>{
            let dt = new Date(post.created_at.replace(' ', 'T'));
            let date = dt.getDate()
            let month = dt.getMonth() + 1
            let year = dt.getFullYear()
            let hour = dt.getHours()
            let minutes = dt.getMinutes()
            return(
              <TimelineCard
                avatar={post.avatar} 
                caption={post.caption_post}
                comments={post.detail_comments}
                date={`${date}/${month}/${year}`}
                links={post.detail_media_feed}
                name={post.display_name}
                place={post.place}
                time={`${hour}:${minutes}`}
                key={post.account_id}/>
            )
          })}
        </div>
    </div>
  )
}
