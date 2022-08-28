import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './loginScreen.css'
import { useGoogleLogin } from '@react-oauth/google'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      navigate('/')
    }
  }, [navigate])

  const loginHandler = async (e) => {
    e.preventDefault()

    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const { data } = await axios.post(
        '/api/auth/login',
        { email, password },
        config
      )

      localStorage.setItem('authToken', data.token)

      navigate('/')
    } catch (error) {
      setError(error.response.data.error)
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        const tokens = await axios.post('/api/auth/googleLogin', {
          code
        })
        localStorage.setItem('authToken', tokens.data.tokens.id_token)
        console.log(tokens.data.tokens)

        navigate('/')
      } catch (error) {
        setError(error.response.data.error)
        setTimeout(() => {
          setError('')
        }, 5000)
      }
    },
    flow: 'auth-code'
  })

  return (
    <div className='login-screen'>
      <form onSubmit={loginHandler} className='login-screen__form'>
        <h3 className='login-screen__title'>Login</h3>
        {error && <span className='error-message'>{error}</span>}
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            required
            id='email'
            placeholder='Email address'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>
            Password:{' '}
            <Link to='/forgotpassword' className='login-screen__forgotpassword'>
              Forgot Password?
            </Link>
          </label>
          <input
            type='password'
            required
            id='password'
            autoComplete='true'
            placeholder='Enter password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Login
        </button>

        <span className='login-screen__subtext'>
          Don't have an account? <Link to='/register'>Register</Link>
        </span>
      </form>
      <button onClick={() => googleLogin()}>Sign in with Google 🚀 </button>
    </div>
  )
}

export default LoginScreen
