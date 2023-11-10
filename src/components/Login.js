import { Button } from '@mui/material'
import React from 'react'

function Login() {
  return (
    <div className='app'>
      <div className='login'>
        <div className='login__background'/>
        <div className='login__container'>
          <img src='/logo.png' alt='logo'/>
          <div className='login__text'>
            <h1>Sign In to Chat App</h1>
          </div>
          <Button>
            Sign In With Google
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login