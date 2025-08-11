import { Link, Outlet, createFileRoute } from '@tanstack/react-router'

export type PostType = {
  id: string
  title: string
  body: string
}

const fetchPosts = async (query?: string): Promise<Array<PostType>> => {
  let url = "https://dummyjson.com/posts";
  if (query) {
    url = `https://dummyjson.com/posts/search?q=${query}`
  }
  const response = await fetch(url);
  const data = await response.json();
  return data.posts;
}

export const Route = createFileRoute('/posts/')({
  validateSearch: ({ query }) => {
    return {
      query: (query || "") as string
    }
  },
  loaderDeps: ({ search }) => {
    return {
      query: search.query
    }
  },
  loader: async ({ deps }) => {
    // throw new Error("Something went wrong"); // uncomment to see loading component in effect
    // await new Promise(resolve => { // uncomment to see error component in effect
    //   setTimeout(resolve, 5000)
    // })
    const posts = await fetchPosts(deps.query);
    return {
      posts,
      query: deps.query
    }
  },
  component: PostsComponent,
  pendingComponent: () => <div className='p-8'>
    <h5 className='text-green-700 text-3xl'>Loading posts list... please be patient :) </h5>
  </div>,
  errorComponent: () => <div className='p-8'>
    <h5 className='text-red-700 text-3xl'>Something went wrong, we apologize :(</h5>
  </div>
})

function PostsComponent() {
  const { posts, query } = Route.useLoaderData()

  return (
    <div className="p-8 flex flex-col gap-2">
      <h3 className="text-3xl">Posts List</h3>
      {query && <h4 className="text-lg text-slate-600">Posts that are tagged as "{query}"</h4>}
      <ul className="list-disc pl-4">
        {posts.map((post) => {
          return (
            <li key={post.id} className="whitespace-nowrap">
              <Link
                to="/posts/$postId"
                params={{
                  postId: post.id,
                }}
                className="block py-1 text-blue-800 hover:text-blue-600"
                activeProps={{ className: 'text-black font-bold' }}
              >
                <div>{post.title}</div>
              </Link>
            </li>
          )
        })}
        <li className="whitespace-nowrap">
          <Link
            to="/posts/$postId"
            params={{
              postId: 'does-not-exist',
            }}
            className="block py-1 text-blue-800 hover:text-blue-600"
            activeProps={{ className: 'text-black font-bold' }}
          >
            <div>This post does not exist</div>
          </Link>
        </li>
      </ul>
      <hr />
      <Outlet />
    </div>
  )
}