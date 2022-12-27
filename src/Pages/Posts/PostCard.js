import React from 'react';

const PostCard = ({ post }) => {

    const { image, message, auther } = post;

    return (
        <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl mx-auto my-4">
            <figure><img src={image} alt="Album" className='w-1/4' /></figure>
            <div className="card-body w-3/4">
                <p>{message.length > 100 ?
                    message.slice(0, 100) : message}</p>
                <p>{auther}</p>
            </div>
            <div className="card-actions justify-end my-auto">
                <button className="btn btn-outline">Read More</button>
            </div>
        </div>
    );
};

export default PostCard;