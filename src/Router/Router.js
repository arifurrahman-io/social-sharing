import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import PostDetails from "../Pages/Posts/PostDetails";
import Posts from "../Pages/Posts/Posts";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/signin',
                element: <SignIn></SignIn>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/posts',
                element: <Posts></Posts>
            },
            {
                path: '/postdetails/:id',
                element: <PostDetails></PostDetails>,
                loader: ({ params }) => fetch(`https://social-sharing-server.vercel.app/postdetails/${params.id}`)
            }
        ]
    }
])