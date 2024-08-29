import React from 'react'

import Login from './login'
import Verify from './verify'
import Impersonate from './impersonate'
import VerifyTotp from './verifyTotp'

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

const VerifyTotpPage: React.FC = () => {
  return (
    <div>
      <VerifyTotp />
    </div>
  )
}

export default { LoginPage, VerifyPage, ImpersonatePage, VerifyTotpPage }
