import React, { useState } from 'react' 
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  const history = useHistory()

  const [ formData, setFormData ] = useState({
    email: '',
    username: '',
    genres: [],
    first_name: '',
    last_name: '',
    profile_image: '',
    password: '',
    password_confirmation: '',
  })

  const [ errors, setErrors ] = useState({
    email: { message: '' },
    username: '',
    genres: [],
    first_name: '',
    last_name: '',
    profile_image: '',
    password: '',
    password_confirmation: '',
  })

  const handleChange = (event) => {
    const newObj = { ...formData, [event.target.name]: event.target.value }
    setFormData(newObj)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {                 
      await axios.post('/api/auth/register/', formData)
      history.push('/login')
    } catch (err) {
      console.log(err)
      console.log('ERROR!', err.response.data.errors)
      setErrors(err.response.data.errors)
      console.log(errors) 
    }
  }

  // const handleImageUrl = (url) => {
  //   setFormData({ ...formData, image: url })
  // }

  return (
    <>
      <div className="register-wrapper">
        <div className="title">
          <div className="b">R</div>
          <div className="o">E</div>
          <div className="u">G</div>
          <div className="n">I</div>
          <div className="c">S</div>
          <div className="e">T</div>
          <div className="o">E</div>
          <div className="u">R</div>
          {/* <div className="y">Y</div> */}
          <div className="shadow"></div>
          <div className="shadow-two"></div>
          {/* <h1>HoneyMoon</h1> */}
        </div>
        <div className="register-page">
          <div className="form-page">
            <div className="container">
              <div className="row">
                <form onSubmit={handleSubmit} className="col-10 offset-1 mt-4 col-md-6 offset-md-3">
                  {/* <h3>Register</h3> */}
                  <div className="form-field">
                    <label htmlFor="first_name">First Name</label>
                    <input onInput={handleChange} type="text" name="first_name" placeholder="First Name" value={formData.first_name} />
                    {errors.first_name && <p className="error">{errors.first_name}</p>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="last_name">Last Name</label>
                    <input onInput={handleChange} type="text" name="last_name" placeholder="Last Name" value={formData.last_name} />
                    {errors.last_name && <p className="error">{errors.last_name}</p>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="username">UserName</label>
                    <input onInput={handleChange} type="text" name="username" placeholder="First Name" value={formData.username} />
                    {errors.username && <p className="error">{errors.username.message}</p>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input onInput={handleChange} type="email" name="email" placeholder="Email" value={formData.email} />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="password">Password</label>
                    <input onInput={handleChange} type="password" name="password" placeholder="Password" value={formData.password} />
                    {errors.password && <p className="error">{errors.password.message}</p>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="password_confirmation">Password Confirmation</label>
                    <input onInput={handleChange} type="password" name="password_confirmation" placeholder="Password Confirmation" value={formData.password_confirmation} />
                    {errors.password_confirmation && <p className="error">{errors.password_confirmation.message}</p>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="profile_image">Profile Picture</label>
                    <input onInput={handleChange} type="text" name="profile_image" placeholder="Profile Picture" value={formData.profile_image} />
                    {errors.profile_image && <p className="error">{errors.profile_image.message}</p>}
                  </div>
                  <div className="form-field">
                    <select name="genres" onChange={handleChange} value={[2]}>
                      <option value=" ">All</option>
                      <option value="Thriller">Thriller</option>
                      <option value="Coming-of-Age">Coming-of-Age</option>
                      <option value="Romance">Romance</option>
                      <option value="Comedy">Comedy</option>
                      <option value="Mystery">Mystery</option>
                      <option value="Historical Fiction">Historical Fiction</option>
                      <option value="Horror">Horror</option>
                      <option value="Drama">Drama</option>
                      <option value="Crime">Crime</option>
                      <option value="Dystopia">Dystopia</option>
                      <option value="Biography">Biography</option>
                      <option value="Psychological Thriller">Psychological Thriller</option>
                      <option value="Fantasy">Fantasy</option>
                    </select>
                  </div>
                  {/* <div className="form-field">
                  <ImageUpload
                    value={formData.image}
                    name='image'
                    handleImageUrl={handleImageUrl} />
                </div> */}
                  <button className="btn btn-yellow w-100">Register</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div></>
  )
}

export default Register