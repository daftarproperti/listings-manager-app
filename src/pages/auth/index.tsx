import React from 'react'

import Login from './login'
import Verify from './verify'

const LoginPage: React.FC = () => {
  return (
    <div>
      <Login />
    </div>
  )
}

const VerifyPage: React.FC = () => {
  return (
    <div>
      <Verify />
    </div>
  )
}

export default { LoginPage, VerifyPage }
