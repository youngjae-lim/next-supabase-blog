// _app.js implements some basic navigation and layout styling.
// _app.js will also configure some logic to check if the user is signed in, 
// and show a link for creating new posts if they are.
// Finally it implements a listener for any auth events. 
// And when a new auth event occurs, we'll check to make sure there is currently a signed in user in order to show or hide the Create Post link.

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../api'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async () =>
      checkUser(),
    )
    checkUser()
    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  async function checkUser() {
    const user = supabase.auth.user()
    setUser(user)
  }

  return (
    <div>
      <nav className='p-6 border-b border-gray-300'>
        <Link href='/'>
          <span className='mr-6 cursor-pointer'>Home</span>
        </Link>
        {user && (
          <Link href='/my-posts'>
            <span className='mr-6 cursor-pointer'>My Posts</span>
          </Link>
        )}
        {user && (
          <Link href='/create-post'>
            <span className='mr-6 cursor-pointer'>Create Post</span>
          </Link>
        )}
        <Link href='/profile'>
          <span className='mr-6 cursor-pointer'>Profile</span>
        </Link>
      </nav>
      <div className='py-8 px-16'>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
