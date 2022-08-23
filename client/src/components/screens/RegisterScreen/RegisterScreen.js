import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import './registerScreen.css'

const RegisterScreen = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')

  return (
    <div className='register-screen'>
      <form className='register-screen__form'>
        <h3 className='register-screen__title'>Register</h3>
        <div className='form-group'>
          <label htmlFor='name'>Username:</label>
          <input
            type='text'
            required
            id='name'
            placeholder='Enter Username'
            value={username}
            onChange={() => setUsername(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            type='text'
            required
            id='email'
            placeholder='Enter Email'
            value={email}
            onChange={() => setEmail(e.target.value)}
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
            onChange={() => setPassword(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='confirmpassword'>Confim Passworm:</label>
          <input
            type='password'
            required
            id='confirmpassword'
            placeholder='Retype Password'
            value={confirmpassword}
            onChange={() => setConfirmPassword(e.target.value)}
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

export default RegisterScreen
