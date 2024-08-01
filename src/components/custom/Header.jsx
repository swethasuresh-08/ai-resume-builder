import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'
import logo from './../../../public/logo.svg'
const Header = () => {
  const { user, isSignedIn } = useUser()
  return (
    <div className='p-3 px-5 flex justify-between shadow-md '>
      <img src={logo} width={100} height={100} alt='Logo'></img>
      {isSignedIn ? 
      <div className='flex gap-2 items-center'>
        <Link to={'/dashboard'}>
        <Button variant='secondary'>Dasboard</Button>
        </Link>
        <UserButton />
      </div> :
        <div>
          <Link to={'/auth/sign-in'}>
            <Button>Get Started</Button>
          </Link>
        </div>}

    </div>
  )
}

export default Header
