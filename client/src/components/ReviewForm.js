import React, { useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage } from './Auth'

const ReviewForm = () => {

  const history = useHistory()
  const token = getTokenFromLocalStorage()

  const [ formData, setFormData ] = useState({
    title: '',
    spoiler: false,
    book_rating: '',
    movie_rating: '',
    text: '',
    differences: '',
  })

  const [ errors, setErrors ] = useState({
    title: '',
    spoiler: false,
    book_rating: '',
    movie_rating: '',
    text: '',
    differences: '',
  })

  const { id } = useParams()

  const handleChange = (e) => {
    const newObject = { ...formData, [e.target.name]: e.target.value }
    setFormData(newObject)
    const newErrors = { ...errors, [e.target.name]: '' }
    setErrors(newErrors)
  }

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
      <div className="site-wrapper">
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
                <form className="review-form col-10 offset-1 mt-4 col-md-10 offset-md-3" onSubmit={handleSubmit}>
                  <div className="form-field">
                    <div className="control">
                      <select name="title" onChange={handleChange} value={formData.title}>
                        <option value="" disabled></option>
                        <option value="3">The Shining</option>
                        {/* <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option> */}
                      </select>
                    </div>
                    {/* <label className="review-label"><h3>Your Review</h3></label> */}
                    <div className="control">
                      <input name="checkbox" type='checkbox' onChange={handleChange} value={formData.spoiler} />
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
                    <div className="control">
                      <textarea onInput={handleChange}
                        className="textarea"
                        name="text"
                        value={formData.text} />
                    </div>
                    <div className="control">
                      <textarea onInput={handleChange}
                        className="textarea"
                        name="differences"
                        value={formData.differences} />
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