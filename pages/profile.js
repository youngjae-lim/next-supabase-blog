// The profile page uses the Auth component from the Supabase UI library.
// This component will render a "sign up" and "sign in" form for unauthenticated users,
// and a basic user profile with a "sign out" button for authenticated users.
// It will also enable a magic sign in link.

import { Auth, Typography, Button } from '@supabase/ui'
import { supabase } from '../lib/initSupabase'

const { Text } = Typography

function Profile(props) {
  const { user } = Auth.useUser()

  if (user)
    return (
      <>
        <div className="w-full flex gap-2 sm:flex-col">
          <Text>Singed in: {user.email}</Text>
          <Button block onClick={() => props.supabaseClient.auth.signOut()}>
            Sign out
          </Button>
        </div>
      </>
    )

  return props.children
}

export default function AuthProfile() {
  return (
    <div className='w-full h-full flex justify-center items-center p-4'>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Profile supabaseClient={supabase}>
          <Auth
            supabaseClient={supabase}
            providers={['google', 'github', 'facebook', 'twitter']}
            socialLayout='horizontal'
            socialButtonSize='xlarge'
          />
        </Profile>
      </Auth.UserContextProvider>
    </div>
  )
}
