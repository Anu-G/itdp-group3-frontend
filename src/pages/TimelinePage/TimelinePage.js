import './TimelinePage.css'

import React from 'react'
import { TimelineCard } from '../TimelineCard/TimelineCard'

export const TimelinePage = () => {
  const timelineTest = [
    {
      key: 1,
      avatar: 'https://cms-assets.tutsplus.com/cdn-cgi/image/width=630/uploads/users/1223/posts/32827/image/Cafe%20Logo%20Maker%20for%20Coffee%20and%20Tea%20Designs_.jpg',
      caption: `Updating the reference value countRef.current++ doesn't trigger component re-rendering. This is demonstrated by the fact that 'I rendered!' is logged to the console just once, at initial rendering, and no re-rendering happens when the reference is updated.Updating the reference value countRef.current++ doesn't trigger component re-rendering. This is demonstrated by the fact that 'I rendered!' is logged to the console just once, at initial rendering, and no re-rendering happens when the reference is updated.`,
      date:'28/08/2022',
      links:'https://asset.kompas.com/crops/gsIqLl4O-rNNCt-MiaH40ztt5sk=/0x76:4032x2764/375x240/data/photo/2021/09/11/613c98c27631e.jpg',
      name:'Cafe XYZ',
      place:'Ragunan, Jakarta Selatan',
      time:'20.11',
      comments: [
        {
            key: 1,
            user: 'Arasha',
            comment_fill: 'Aku kemaren kesini'
        },
        {
            key: 2,
            user: 'Bell',
            comment_fill: 'Sesuai dengan deskripsi'
        },
        {
            key: 3,
            user: 'Carl',
            comment_fill: 'Seru banget'
        },

      ]

    },
    {
      key: 2,
      avatar: 'https://cms-assets.tutsplus.com/cdn-cgi/image/width=630/uploads/users/1223/posts/32827/image/Cafe%20Logo%20Maker%20for%20Coffee%20and%20Tea%20Designs_.jpg',
      caption: 'NEW PLACE!!!!',
      date:'26/08/2022',
      links:[
            'https://asset.kompas.com/crops/gsIqLl4O-rNNCt-MiaH40ztt5sk=/0x76:4032x2764/375x240/data/photo/2021/09/11/613c98c27631e.jpg',
            'https://media-assets-ggwp.s3.ap-southeast-1.amazonaws.com/2022/03/Octane-Karakter-Gesit-dan-Berbahaya-di-Apex-Legends-Mobile-2-640x360.jpg',
            'https://asset.kompas.com/crops/gsIqLl4O-rNNCt-MiaH40ztt5sk=/0x76:4032x2764/375x240/data/photo/2021/09/11/613c98c27631e.jpg',
            'https://cdn-www.bluestacks.com/bs-images/pou-banner.jpg',
            'https://asset.kompas.com/crops/gsIqLl4O-rNNCt-MiaH40ztt5sk=/0x76:4032x2764/375x240/data/photo/2021/09/11/613c98c27631e.jpg',
            'https://awsimages.detik.net.id/community/media/visual/2019/08/12/71b9b8ff-01fd-4dd4-807b-428537b0e4e2_169.jpeg?w=700&q=90'
        ],
      name:'Cafe ABC',
      place:'Sudirman, Jakarta Selatan',
      time:'21.12',
      comments: [
        {
            key: 1,
            user: 'Darren',
            comment_fill: 'Nice Place'
        },
        {
            key: 2,
            user: 'Elijah',
            comment_fill: 'Soon to be my new hangout place?'
        },
        {
            key: 3,
            user: 'Farah',
            comment_fill: 'I like the design'
        },
        {
            key: 4,
            user: 'Farah',
            comment_fill: 'And their food too.'
        },

      ]

    },
  ]

  return (
    <div className='tl-bg'>
        <div className='tl-lst'>
          {timelineTest.map((post)=>{
            return(
              <TimelineCard
                avatar={post.avatar} 
                caption={post.caption}
                comments={post.comments}
                date={post.date}
                links={post.links}
                name={post.name}
                place={post.place}
                time={post.time}
                key={post.key}/>
            )
          })}
        </div>
    </div>
  )
}
