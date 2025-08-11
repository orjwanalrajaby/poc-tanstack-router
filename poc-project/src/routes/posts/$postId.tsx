import { createFileRoute } from '@tanstack/react-router'

export type PostType = {
  id: string
  title: string
  body: string
}

const fetchPostById = async (id: string): Promise<PostType> => {
  try {
    const response = await fetch(`https://dummyjson.com/posts/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Something went wrong", error)
    throw new Error("Something went wrong")
  }
}

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params: { postId } }) => {
    const post = await fetchPostById(postId);

    return {
      post,
      postId
    }
  },
  component: SinglePost,
})

function SinglePost() {
  const { post, postId } = Route.useLoaderData()
  // const { postId } = Route.useParams();


  return <div className='p-8 space-y-3'>
    <h3 className='text-blue-800 text-2xl'>{post.title}</h3>
    <p className='text-blue-900 text-lg'>{post.body}</p>
    <p className='text-slate-800 text-sm'>Post id is: {postId}</p>
  </div>
}
