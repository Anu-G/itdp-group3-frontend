import './TimelinePage.css'

import React from 'react'
import { TimelineCard } from '../TimelineCard/TimelineCard'

export const TimelinePage = () => {
  return (
    <div className='tl-bg'>
        <div className='tl-lst'>
            <TimelineCard/>
            <TimelineCard/>
            <TimelineCard/>
            <TimelineCard/>
        </div>
    </div>
  )
}
