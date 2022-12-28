import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import './Style.css';

const PostDetails = () => {

    const post = useLoaderData();
    const [counter, setCounter] = useState(1);

    const { message, image, auther, love } = post;

    const incrementCounter = () => setCounter(counter + 1);

    return (
        <div className="card card-compact mx-2 md:w-3/4 md:mx-auto my-6 bg-base-100 shadow-xl">
            <p className='card-body'>{auther}</p>
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <p>{message}</p>
                <div className="style text-blue-600 text-2xl">
                    <button onClick={incrementCounter}><FaHeart /></button>
                    <p className='ml-6'>{love}</p>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;