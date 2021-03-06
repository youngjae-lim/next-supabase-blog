import { useRouter } from 'next/router'
import ReactMarkDown from 'react-markdown'
import { supabase } from '../../lib/initSupabase'
import CodeBlock from '../../components/CodeBlock'

export default function Post({ post }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className='text-5xl mt-4 font-semibold tracking-wide'>
        {post.title}
      </h1>
      <p className='text-sm font-light my-4'>by {post.user_email}</p>
      <div className='mt-8'>
        {
          <ReactMarkDown
            className='prose'
            children={post.content}
            components={CodeBlock}
          />
        }
      </div>
    </div>
  )
}

// This funciton gets called at build time
export async function getStaticPaths() {
  // Get ids from supabase posts table
  const { data, error } = await supabase.from('posts').select('id')

  const paths = data.map((post) => ({
    params: { id: JSON.stringify(post.id) },
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const { id } = params
  const { data } = await supabase
    .from('posts')
    .select()
    .filter('id', 'eq', id)
    .single()

  return {
    props: {
      post: data,
    },
  }
}
