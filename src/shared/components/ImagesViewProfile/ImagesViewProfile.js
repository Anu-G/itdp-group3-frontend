import './ImagesViewProfile.css'

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const ImagesViewProfile = ({link,handleClick,item}) => {
  return (
    <div>
        <div className='img-vw-ctn'>
            <img className='img-vw-profile' src={link} onClick={()=>handleClick(item)}/>
        </div>
    </div>
  )
}

export const ImagesViewTimeline = ({link}) => {
    return (
      <div>
          <div className='img-tl-ctn'>
              <img className='img-vw-profile' src={link}/>
          </div>
      </div>
    )
  }

export const ImagesViewTimelineMany = ({links}) => {

  const [slideIndex, setSlideIndex] = useState(1)

  const handleNext = () => {
    if(slideIndex !== links.length){
      setSlideIndex(slideIndex + 1)
    } else if (slideIndex === links.length){
      setSlideIndex(1)
    }
  }

  const handlePrev = () => {
    if(slideIndex !==1){
      setSlideIndex(slideIndex-1)
    } else if(slideIndex ===1){
      setSlideIndex(links.length)
    }
  }

  const moveDot = (index) => {
    setSlideIndex(index)
  }
 
  return (
  <>
    <div className='container-slider'>
      {links.map((link, index)=>{
        return(
          <div className={slideIndex === index + 1 ? "slide active-anim" : "slide"}>
            <img src={link}/>
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
                {Array.from({length: links.length}).map((item, index) => (
                    <div 
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
    </div>
  </>
  )
}
