import React, { useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage } from './Auth'

const ReviewForm = () => {

  const history = useHistory()
  const token = getTokenFromLocalStorage()

  const [ formData, setFormData ] = useState({
    title: '',
    spoilers: false,
    book_rating: '',
    movie_rating: '',
    text: '',
    differences: '',
  })

  const [ errors, setErrors ] = useState({
    title: '',
    spoilers: false,
    book_rating: '',
    movie_rating: '',
    text: '',
    differences: '',
  })

  const { id } = useParams()

  const handleChange = (e) => {
    const newObject = { ...formData, [e.target.name]: e.target.name === 'spoilers' ? e.target.checked : e.target.value }
    console.log(newObject)
    setFormData(newObject)
    const newErrors = { ...errors, [e.target.name]: '' }
    setErrors(newErrors)
  }

  // const handleChecked = (e) => {
  //   console.log(e.target.checked)
  // }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      await axios.post('/api/reviews/', 
        formData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      history.push(`/adaptations/${id}/`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="review-wrapper">
        <div className="title">
          <div className="b">R</div>
          <div className="o">E</div>
          <div className="u">V</div>
          <div className="n">I</div>
          <div className="c">E</div>
          <div className="e">W</div>
          {/* <div className="o">E</div>
          <div className="u">R</div> */}
          {/* <div className="y">Y</div> */}
          <div className="shadow"></div>
          <div className="shadow-two"></div>
          {/* <h1>HoneyMoon</h1> */}
        </div>
        <div className='review-page'>
          <Link to={`/adaptations/${id}`}>
            <h4 className='list-link'>Back to Title</h4>
          </Link>
          <div className="form-page">
            <div className="container">
              <div className="row">
                <form className="review-form" onSubmit={handleSubmit}>
                  <div className="form-field">
                    <div className="control">
                      <div className="select-title">
                        <h3>Select Title</h3>
                      </div>
                      <select name="title" className="title-select" onChange={handleChange} value={formData.title}>
                        <option value="" disabled></option>
                        <option value="3">The Shining</option>
                        {/* <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option> */}
                      </select>
                      
                    </div>
                    {/* <label className="review-label"><h3>Your Review</h3></label> */}
                    <div className="select-checkbox">
                      <h3>Does your review contain any spoilers?</h3>
                    </div>
                    <div className="control">
                      <input name="spoilers" type='checkbox' className="checkbox" onChange={handleChange} value={formData.spoiler} />
                    </div>
                    <div className="select-book-rating">
                      <h3>What would you rate the book?</h3>
                    </div>
                    <div className="control">
                      <select name="book_rating" onChange={handleChange} value={formData.book_rating}>
                        <option value="" disabled></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <div className="select-movie-rating">
                      <h3>What would you rate the movie?</h3>
                    </div>
                    <div className="control">
                      <select name="movie_rating" onChange={handleChange} value={formData.movie_rating}>
                        <option value="" disabled></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <div className="review-thoughts">
                      <h3>Share your thoughts</h3>
                    </div>
                    <div className="text-fields">
                      <div className="control">
                        <textarea onInput={handleChange}
                          className="textarea"
                          name="text"
                          value={formData.text} />
                      </div>
                      <div className="differences">
                        <h3>What differences did you notice between the book and the movie?</h3>
                      </div>
                      <div className="control">
                        <textarea onInput={handleChange}
                          className="textarea"
                          name="differences"
                          value={formData.differences} />
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <button className="button" type="submit">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div></>
  )
}

export default ReviewForm