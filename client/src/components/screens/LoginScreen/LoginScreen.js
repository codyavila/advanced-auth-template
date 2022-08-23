import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import './loginScreen.css'

const LoginScreen = (history) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const registerHandler = async (e) => {
    e.preventDefault()

    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    }

    return (
      <div className='register-screen'>
        <form onSubmit={registerHandler} className='register-screen__form'>
          <h3 className='register-screen__title'>Register</h3>
          {error && <span className='error-message'>{error}</span>}
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input
              type='text'
              required
              id='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Email:</label>
            <input
              type='password'
              required
              id='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Register
          </button>

          <span className='register-screen__subtext'>
            Already have an account? <Link to='/login'>Login Here</Link>
          </span>
        </form>
      </div>
    )
  }
}

export default LoginScreen
