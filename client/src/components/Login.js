import React, { useState } from 'react'
import axios from 'axios' 
import { Link, useHistory } from 'react-router-dom'

const Login = () => {

  const history = useHistory() 

  const [ formData, setFormData ] = useState({
    email: '',
    password: '',
  })

  const [ errors, setErrors ] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    const newObj = { ...formData, [event.target.name]: event.target.value }
    setFormData(newObj)
  }

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('token', token) 
    history.push('/adaptations') 
  }

  const handleSubmit = async (event) => {
    event.preventDefault() 
    try {
      const { data } = await axios.post('/api/auth/login/', formData)
      setTokenToLocalStorage(data.token) 
    } catch (err) {
      console.log(err.response.data)
      setErrors(err.response.data)
      console.log(err)
    }
  }

  return (
    <>
      <div className="login-wrapper">
        <div className="title">
          <div className="b">L</div>
          <div className="o">O</div>
          <div className="n">G</div>
          <div className="n">I</div>
          <div className="e">N</div>
          <div className="shadow"></div>
          <div className="shadow-two"></div>
        </div>
        <div className="login-page">
          <div className="form-page">
            <div className="container">
              <div className="row">
                <form onSubmit={handleSubmit} className="col-10 offset-1 mt-4 col-md-6 offset-md-3">
                  <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input onChange={handleChange} type="email" name="email" placeholder="Email" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChange} type="password" name="password" placeholder="Password" />
                  </div>
                  <button className="btn btn-yellow w-100">Login</button>
                  <p className="no-account">Don&apos;t have an Account?<Link to="/register"><span> Click Here</span></Link></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div></>
  )
}

export default Login