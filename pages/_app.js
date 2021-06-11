// _app.js implements some basic navigation and layout styling.
// _app.js will also configure some logic to check if the user is signed in,
// and show a link for creating new posts if they are.
// Finally it implements a listener for any auth events.
// And when a new auth event occurs, we'll check to make sure there is currently a signed in user in order to show or hide the Create Post link.

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/initSupabase'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  const router = useRouter()

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
      <nav className='p-6 border-b bg-blue-300 border-gray-300'>
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
          <span className='mr-6 cursor-pointer'>
            {user ? 'Profile' : 'Login'}
          </span>
        </Link>
        {user && (
          <button
            className='btn-black mr-6 cursor-pointer'
            onClick={async () => {
              const { error } = await supabase.auth.signOut()
              if (error) console.log('Error logging out:', error.message)
              router.push('/profile')
            }}
          >
            Logout
          </button>
        )}
      </nav>
      <div className='h-full px-10 py-4 bg-gray-50'>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
