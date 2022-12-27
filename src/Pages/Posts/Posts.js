import { useQuery } from '@tanstack/react-query';
import React from 'react';
import PostCard from './PostCard';

const Posts = () => {


    const url = 'http://localhost:5000/posts';
    const { data: posts = [] } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    return (
        <div >
            {
                posts?.length && posts.map(post => <PostCard
                    key={post._id}
                    post={post}
                ></PostCard>)
            }
        </div>
    );
};

export default Posts;