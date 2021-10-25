import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'


const TitleCard = () => {

  const [ title, setTitle ] = useState([])
  const [ hasError, setHasError ] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    const getTitle = async () => {
      try {
        const { data } = await axios(`/api/adaptations/${id}`)
        setTitle(data)
        // console.log('reviews', title.reviews.map(t => {
        //   return t.text
        // }))
        // console.log('title', title.genres.name)
        // title.genres.map(t => {
        //   console.log(t.name)
        // })
      } catch (err) {
        setHasError(true)
      }
    }
    getTitle()
  }, [id, title])


  let titlesToRender

  if (title.genres) {
    titlesToRender = title.genres.map((t, i) => {
      return <li className="genre-list"key={i}>{t.name}</li>
    })
  } else {
    titlesToRender = 'Loading....'
  }

  let reviewsToRender



  if (title.reviews) {
    reviewsToRender = title.reviews.map((t, i) => {
      // const spoiler = t.spoiler
      return <div className="review-post" key={i}>
        <p>Movie Rating {t.movie_rating}</p>
        <p>Book Rating {t.book_rating}</p>
        <p>Thoughts {t.text}</p>
        <p>Differences between the two {t.differences}</p>
      </div>
    })
  } else {
    reviewsToRender = 'Loading...'
  }
  
  // {title.reviews ?
  //   reviewsToRender = title.reviews.map((t,i) => {
  //     return
  //   })

  // let spoilersToRender

  // const spoilerCheck = (s) => {
  //   if (title.reviews) {
  //     spoilersToRender = title.reviews.map((t, i) => {
  //       console.log(t)
  //       s = t.spoilers
  //     })
  //   }
  // }







  return (
    <>
      <div className="title-card">
        <div className="heading">
          <h1 className="title-name">{title.name}</h1>
        </div>
        <div className="movie-book-synopsis">
          <div className="movie-book">
            <div className="movie">
              <img className="movie-image" src={title.movie_image} alt={title.movie_image} />
              <h3>{title.director}</h3>
              <p>{title.movie_release_year}</p>
              <a href={title.movie_link} rel="noreferrer" target="_blank">
                <p className="learn-more-btn">Learn more</p>
              </a>
            </div>
            {/* <div className="synopsis">
              <h3>{title.synopsis}</h3>
              {titlesToRender}
            </div> */}
            <div className="book">
              <img className="book-image" src={title.book_image} alt={title.book_image} />
              <h3>{title.author}</h3>
              <p>{title.book_release_year}</p>
              <a href={title.book_link} rel="noreferrer" target="_blank">
                <p className="learn-more-btn">Learn more</p>
              </a>
            </div>
          </div>
          <div className="synopsis">
            <h3>{title.synopsis}</h3>
            {titlesToRender}
          </div>
          <div className="review-link-div">
            <Link to={`/adaptations/${title.id}/reviews`}>
              <h4 className='review-link'>Post a review!</h4>
            </Link>
          </div>
          {/* {title.reviews.map(t => { */}
          {/* {t.spoiler ? 
            <h3>Hidden</h3>
          
            :
            <div className="div review-box d-flex flex-wrap justify-content-center">
              {reviewsToRender}
            </div>
          } */}
          {/* })} */}
        </div>
      </div>
    </>
  )
}

export default TitleCard