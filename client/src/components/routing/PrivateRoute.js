import { Navigate, Route, Routes } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Routes>
      <Route
        {...rest}
        render={(props) => {
          localStorage.getItem('authToken') ? (
            <Component {...props} />
          ) : (
            <Navigate to='/login' />
          )
        }}
      />
    </Routes>
  )
}

export default PrivateRoute
