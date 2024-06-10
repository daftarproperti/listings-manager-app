import React from 'react'

import Login from './login'
import Verify from './verify'
import Impersonate from './impersonate'

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

const ImpersonatePage: React.FC = () => {
  return (
    <div>
      <Impersonate />
    </div>
  )
}

export default { LoginPage, VerifyPage, ImpersonatePage }
