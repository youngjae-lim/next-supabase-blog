// The profile page uses the Auth component from the Supabase UI library. 
// This component will render a "sign up" and "sign in" form for unauthenticated users, 
// and a basic user profile with a "sign out" button for authenticated users. 
// It will also enable a magic sign in link.

import { Auth, Typography, Button } from '@supabase/ui'
import { supabase } from '../api'

const { Text } = Typography

function Profile(props) {
  const { user } = Auth.useUser()
  if (user)
    return (
      <>
        <Text>Singed in: {user.email}</Text>
        <Button block onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </>
    )

  return props.children
}

export default function AuthProfile() {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Profile supabaseClient={supabase}>
        <Auth supabaseClient={supabase} />
      </Profile>
    </Auth.UserContextProvider>
  )
}
