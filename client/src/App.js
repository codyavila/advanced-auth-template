import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Axios from 'axios'

import PrivateRoute from './components/routing/PrivateRoute'

import PrivateScreen from './components/screens/PrivateScreen/PrivateScreen'
import LoginScreen from './components/screens/LoginScreen/LoginScreen'
import RegisterScreen from './components/screens/RegisterScreen/RegisterScreen'
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen/ForgotPasswordScreen'
import ResetPasswordScreen from './components/screens/ResetPasswordScreen/ResetPasswordScreen'

Axios.defaults.baseURL = 'https://advanced-auth-template.herokuapp.com/'

const App = () => {

  return (
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
  )
}

export default App
