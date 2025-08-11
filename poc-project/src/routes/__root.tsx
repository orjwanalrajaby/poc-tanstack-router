import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
    component: () => (
        <div>
            <div className="p-8 flex gap-2">
                <Link to="/" className="[&.active]:font-bold">
                    Home
                </Link>{' '}
                <Link to="/about" className="[&.active]:font-bold">
                    About
                </Link>
                <Link
                    to="/posts"
                    search={{
                        query: "love"
                    }}
                    // className="[&.active]:font-bold"
                    activeProps={{
                        style: {
                            fontWeight: "bold"
                        }
                    }}
                >
                    {({ isActive }) => isActive ? <span className='text-purple-600'>Posts</span> : <span className='text-amber-600'>Posts</span>}
                </Link>
            </div>
            <hr />
            <Outlet />
            <TanStackRouterDevtools />
        </div>
    ),
})