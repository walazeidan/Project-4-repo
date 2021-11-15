import React, { useState } from 'react' 
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  const history = useHistory()

  const [ formData, setFormData ] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
  })

  const [ errors, setErrors ] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
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
      console.log(err.response)
      console.log('ERROR!', err.response.data)
      setErrors(err.response.data)
    }
  }


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
          <div className="shadow"></div>
          <div className="shadow-two"></div>
        </div>
        <div className="register-page">
          <div className="form-page">
            <div className="container">
              <div className="row">
                <form onSubmit={handleSubmit} className="col-10 offset-1 mt-4 col-md-6 offset-md-3">
                  <div className="form-field">
                    <label htmlFor="first_name">First Name</label>
                    <input onInput={handleChange} type="text" name="first_name" placeholder="First Name" value={formData.first_name} />
                    {errors.first_name && <p className="error">Please Enter Valid First Name</p>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="last_name">Last Name</label>
                    <input onInput={handleChange} type="text" name="last_name" placeholder="Last Name" value={formData.last_name} />
                    {errors.last_name && <p className="error">Please Enter Valid Last Name</p>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="username">UserName</label>
                    <input onInput={handleChange} type="text" name="username" placeholder="First Name" value={formData.username} />
                    {errors.username && <p className="error">Please Enter Valid Username</p>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input onInput={handleChange} type="email" name="email" placeholder="Email" value={formData.email} />
                    {errors.email && <p className="error">Please Enter Valid Email</p>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="password">Password</label>
                    <input onInput={handleChange} type="password" name="password" placeholder="Password" value={formData.password} />
                    {errors.password && <p className="error">Please Enter Valid Password</p>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="password_confirmation">Password Confirmation</label>
                    <input onInput={handleChange} type="password" name="password_confirmation" placeholder="Password Confirmation" value={formData.password_confirmation} />
                    {errors.password_confirmation && <p className="error">Password Confirmation Error</p>}
                  </div>
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