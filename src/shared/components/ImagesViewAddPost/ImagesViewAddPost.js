import './ImagesViewAddPost.css'

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const ImagesViewAddPost = ({ link, handleClick }) => {
  return (
    <div>
      <div className='img-vw-ctn'>
        <img className='img-vw-addpost' src={link} onClick={handleClick} />
      </div>
    </div>
  )
}

export const ImagesViewAddPostOne = ({ link, handleDelete, triggerFileSelectPopup, onSelectFile, inputRef }) => {
  return (
    <div className='container-slider'>
      <div className='img-tl-ctn'>
        {link[0].includes("video")
          ? <video width="100%" height="344" controls>
            <source src={link[0]} type="video/mp4" />
          </video>
          : <img className='img-vw-addpost' src={link[0]} />}
      </div>

      <input multiple type="file" accept='image/*,video/*' ref={inputRef} style={{ display: "none" }} onChange={onSelectFile} name="fileName" />

      <div>
        <button className='carousel-btn top-right-secondary' onClick={triggerFileSelectPopup}>
          <FontAwesomeIcon icon="fa-solid fa-plus" style={{ color: "#FED154" }} />
        </button>
      </div>

      <div>
        <button className='carousel-btn top-right' onClick={() => handleDelete()}>
          <FontAwesomeIcon icon="fa-solid fa-trash" style={{ color: "#FED154", fontSize: "30px" }} />
        </button>
      </div>
    </div>

  )

}

export const ImageViewAddPostMany = ({ links, handleDelete, triggerFileSelectPopup, onSelectFile, inputRef }) => {

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

  const onDelete = () => {
    if (slideIndex == links.length) {
      handleDelete(slideIndex)
      setSlideIndex(prevState => links.length - 1)
    } else {
      handleDelete(slideIndex)
    }
  }

  return (
    <div className='container-slider'>
      {links.map((link, index) => {
        return (
          <div className={slideIndex === index + 1 ? "slide active-anim" : "slide"} key={index}>
            {link.includes("video")
              ? <video width="100%" height="344" controls>
                <source src={link} type="video/mp4" />
              </video>
              : <img className='img-vw-addpost' src={link} />}
          </div>
        )
      })}

      <input multiple type="file" accept='image/*,video/*' ref={inputRef} style={{ display: "none" }} onChange={onSelectFile} name="fileName" />

      <div>
        <button className='carousel-btn top-right-secondary' onClick={triggerFileSelectPopup}>
          <FontAwesomeIcon icon="fa-solid fa-plus" style={{ color: "#FED154" }} />
        </button>
      </div>

      <div>
        <button className='carousel-btn top-right' onClick={onDelete}>
          <FontAwesomeIcon icon="fa-solid fa-trash" style={{ color: "#FED154", fontSize: "30px" }} />
        </button>
      </div>

      <div>
        <button className='carousel-btn right' onClick={handleNext}>
          <FontAwesomeIcon icon="fa-solid fa-angle-right" style={{ color: "#FED154" }} />
        </button>
      </div>

      <div>
        <button className='carousel-btn left' onClick={handlePrev}>
          <FontAwesomeIcon icon="fa-solid fa-angle-left" style={{ color: "#FED154" }} />
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
  )
}
