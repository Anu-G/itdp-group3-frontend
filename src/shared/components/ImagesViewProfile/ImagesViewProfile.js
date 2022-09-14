import './ImagesViewProfile.css'

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const ImagesViewProfile = ({ link, handleClick }) => {
  return (
    <div>
      <div className='img-vw-ctn'>
        {link.toUpperCase().includes(".MP4") || link.toUpperCase().includes(".MOV") ||
            link.toUpperCase().includes(".WMV") || link.toUpperCase().includes(".FLV") ||
            link.toUpperCase().includes(".AVI") || link.toUpperCase().includes(".WebM") ||
            link.toUpperCase().includes(".AVCHD") || link.toUpperCase().includes(".MKV") ?
            <video className='img-vw-profile' onClick={handleClick}>
              <source src={link} type="video/mp4" />
            </video>
            : <img className='img-vw-profile' src={link} onClick={handleClick}/>}
      </div>
    </div>
  )
}

export const ImagesViewTimeline = ({ link }) => {
  return (
    <div>
      <div className='img-tl-ctn'>
        {link[0].toUpperCase().includes(".MP4") || link[0].toUpperCase().includes(".MOV") ||
          link[0].toUpperCase().includes(".WMV") || link[0].toUpperCase().includes(".FLV") ||
          link[0].toUpperCase().includes(".AVI") || link[0].toUpperCase().includes(".WebM") ||
          link[0].toUpperCase().includes(".AVCHD") || link[0].toUpperCase().includes(".MKV") ?
          <video width="100%" height="344" controls>
            <source src={link[0]} type="video/mp4" />
          </video>
          : <img className='img-vw-profile' src={link[0]} />}
      </div>
    </div>
  )
}

export const ImagesViewTimelineMany = ({ links }) => {

  const [slideIndex, setSlideIndex] = useState(1)

  const handleNext = () => {
    if (slideIndex !== links.length) {
      setSlideIndex(slideIndex + 1)
    } else if (slideIndex === links.length) {
      setSlideIndex(1)
    }
  }

  const handlePrev = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1)
    } else if (slideIndex === 1) {
      setSlideIndex(links.length)
    }
  }

  const moveDot = (index) => {
    setSlideIndex(index)
  }

  return (
    <>
      <div className='container-slider'>
        {links.map((link, index) => {
          return (
            <div className={slideIndex === index + 1 ? "slide active-anim" : "slide"} key={index}>
              {link.toUpperCase().includes(".MP4") || link.toUpperCase().includes(".MOV") ||
                link.toUpperCase().includes(".WMV") || link.toUpperCase().includes(".FLV") ||
                link.toUpperCase().includes(".AVI") || link.toUpperCase().includes(".WebM") ||
                link.toUpperCase().includes(".AVCHD") || link.toUpperCase().includes(".MKV") ?
                <video width="100%" height="344" controls>
                  <source src={link} type="video/mp4" />
                </video>
                : <img className='img-vw-profile' src={link} />}
            </div>
          )
        })}

        <div>
          <button className='carousel-btn right' onClick={handleNext}>
            <FontAwesomeIcon icon="fa-solid fa-angle-right" />
          </button>
        </div>

        <div>
          <button className='carousel-btn left' onClick={handlePrev}>
            <FontAwesomeIcon icon="fa-solid fa-angle-left" />
          </button>
        </div>

        <div className="container-dots">
          {Array.from({ length: links.length }).map((item, index) => (
            <div
              onClick={() => moveDot(index + 1)}
              className={slideIndex === index + 1 ? "dot active" : "dot"}
              key={index}
            ></div>
          ))}
        </div>
      </div>
    </>
  )
}
