import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const PostBox = () => {

    const { user } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const navigate = useNavigate()

    const handlePost = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {

                if (imgData.success) {
                    const myPost = {
                        message: data.message,
                        image: imgData.data.url,
                        auther: user.displayName,
                        email: user.email
                    }
                    // save product info to db
                    fetch(' http://localhost:5000/posts', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `berear ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(myPost)
                    })
                        .then(res => res.json())
                        .then(result => {
                            toast.success(`Post added successfully`);
                            data.reset();
                            console.log(result);
                            navigate('/');
                        })
                }
            })

    }


    return (
        <div className="py-8 lg:py-16">
            <div className="max-w-4xl mx-auto px-4">
                <div onSubmit={handleSubmit} className="card ">
                    <form onSubmit={handleSubmit(handlePost)}>

                        <div className="form-control w-full ">
                            <label className="label"><span className="label-text">Say Something <span className='text-teal-600 font-bold'>{user?.displayName}</span></span></label>
                            <textarea type='text' {...register("message", { required: "Say Something..." })} className="input input-bordered w-full p-5 h-36" required />
                            {errors.description && <p className='text-red-600' role="alert">{errors.description?.message}</p>}
                        </div>
                        <div className="form-control w-full mt-1">
                            <input type='file' {...register("image", { required: "Message is Required." })} className="w-full" required />
                            {errors.image && <p className='text-red-600' role="alert">{errors.image?.message}</p>}
                        </div>
                        <input className='btn btn-primary w-full mt-5' value='Post' type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostBox; 