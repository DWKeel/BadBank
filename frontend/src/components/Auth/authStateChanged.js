import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth/authContext'
import firebase from '../../contexts/auth/firebaseConfig'
import { useNavigate } from 'react-router-dom'

const AuthStateChanged = ({ children }) => {

  const [isLoading, setIsLoading] = useState(true)
  const { setAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    firebase.getCurrentUser(user => {
      if (user) {
        setAuth(user)
        user.getIdToken().then(token => {
          localStorage.setItem('token', token)
        })
        setIsLoading(false)
      } else {
        setIsLoading(false)
        navigate('/')
      }
    })
  }, [])

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return children
}

export { AuthStateChanged }