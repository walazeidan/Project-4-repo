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
    preference: '',
    text: '',
    differences: '',
  })

  const [ errors, setErrors ] = useState({
    title: '',
    spoilers: false,
    preference: '',
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
      console.log(err.response)
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
                        <option value="4">The Graduate</option>
                        <option value="5">Trainspotting</option>
                        <option value="6">A Clockwork Orange</option>
                        <option value="7">Pride and Prejudice</option>
                        <option value="8">Requiem for a Dream</option>
                        <option value="9">If Beale Street Could Talk</option>
                        <option value="10">Gone Girl</option>
                        <option value="11">The Age of Innocence</option>
                        <option value="12">American Psycho</option>
                        <option value="13">The Godfather</option>
                        <option value="14">Mysterious Skin</option>
                        <option value="15">Battle Royale</option>
                        <option value="16">Fear and Loathing in Las Vegas</option>
                        <option value="17">We Need to Talk About Kevin</option>
                        <option value="18">To Kill a Mockingbird</option>
                        <option value="19">Fight Club</option>
                        <option value="20">Room</option>
                        <option value="21">The Color Purple</option>
                        <option value="22">Lust, Caution</option>
                        <option value="23">Little Women</option>
                        <option value="24">Never Let Me Go</option>
                        <option value="25">The Virgin Suicides</option>
                        <option value="26">Picnic at Hanging Rock</option>
                        <option value="27">Frankenstein</option>
                        <option value="28">A Streetcar Named Desire</option>
                        <option value="29">Diary of a Teenage Girl</option>
                        <option value="30">The Silence of the Lambs</option>
                        <option value="31">Drive</option>
                        <option value="32">The Great Gatsby</option>
                        <option value="33">Everything is Illuminated</option>
                        <option value="34">I&apos;m Thinking of Ending Things </option>
                        <option value="35">One Flew Over The Cuckoo&apos;s Nest</option>
                        <option value="36">No Country For Old Men</option>
                        <option value="37">Sense and Sensibility</option>
                        <option value="38">Romeo and Juliet</option>
                        
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
                      <h3>Did you prefer the book or the movie?</h3>
                    </div>
                    <div className="control">
                      <select name="preference" className="preference" onChange={handleChange} value={formData.preference}>
                        <option value="" disabled></option>
                        <option value="book">Book</option>
                        <option value="movie">Movie</option>
                        {/* <option value="3">3</option>
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
                        <option value="5">5</option> */}
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
                        <h3>What differences did you notice between the book and the movie? (optional)</h3>
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