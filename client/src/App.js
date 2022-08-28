import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Axios from 'axios'

import PrivateRoute from './components/routing/PrivateRoute'

import PrivateScreen from './components/screens/PrivateScreen/PrivateScreen'
import LoginScreen from './components/screens/LoginScreen/LoginScreen'
import RegisterScreen from './components/screens/RegisterScreen/RegisterScreen'
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen/ForgotPasswordScreen'
import ResetPasswordScreen from './components/screens/ResetPasswordScreen/ResetPasswordScreen'

import { GoogleOAuthProvider } from '@react-oauth/google'

// Axios.defaults.baseURL = 'https://advanced-auth-template.herokuapp.com/'
Axios.defaults.baseURL = 'http://localhost:4000'

const App = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <div className='app'>
          <PrivateRoute path='/' element={<PrivateScreen />} />
          <Routes>
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/forgotpassword' element={<ForgotPasswordScreen />} />
            <Route
              path='/resetpassword/:resetToken'
              element={<ResetPasswordScreen />}
            />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  )
}

export default App
