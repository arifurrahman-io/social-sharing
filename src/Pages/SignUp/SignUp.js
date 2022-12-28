import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useToken from '../../hooks/useToken';
import Loading from '../../Shared/Loading/Loading';
import img from '../../assets/signup.jpg';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser, loading } = useContext(AuthContext);

    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);


    const navigate = useNavigate();

    if (token) {
        navigate('/');
    }

    const handleSignUp = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                toast.success('User Created Successfully!');
                const userInfo = {
                    displayName: data.name,
                    phoneNumber: data.phone
                }

                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email, data.phone);
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => {
                console.log(err);
                if (err.code === "auth/email-already-in-use") {
                    toast.error('This Email Already Used');
                    return navigate('/');
                }
            });
    }


    const saveUser = (name, email, phone) => {
        const user = { name, email, phone }
        fetch('https://social-sharing-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email)
            })
    }

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className="hero py-8 lg:py-16">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left w-full lg:w-1/2">
                    <img src={img} alt="" />
                </div>
                <div onSubmit={handleSubmit} className="card w-full lg:w-1/2">
                    <form onSubmit={handleSubmit(handleSignUp)}>

                        <div className="form-control w-full ">
                            <label className="label"><span className="label-text">Name</span></label>
                            <input type='text' {...register("name", { required: "Name is Required." })} className="input input-bordered w-full " />
                            {errors.name && <p className='text-red-600' role="alert">{errors.name?.message}</p>}
                        </div>

                        <div className="form-control w-full ">
                            <label className="label"><span className="label-text">Phone</span></label>
                            <input type='number' {...register("phone", { required: "Phone Number is Required." })} className="input input-bordered w-full " />
                            {errors.phone && <p className='text-red-600' role="alert">{errors.phone?.message}</p>}
                        </div>

                        <div className="form-control w-full ">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input type='email' {...register("email", { required: "Email Address is Required." })} className="input input-bordered w-full " />
                            {errors.email && <p className='text-red-600' role="alert">{errors.email?.message}</p>}
                        </div>
                        <div className="form-control w-full">
                            <label className="label"><span className="label-text">Password</span></label>
                            <input type='password' {...register("password", { required: "Password is Required", minLength: { value: 6, message: "Password must be 6 charecters or longer." } })} className="input input-bordered w-full" />
                            {errors.password && <p className='text-red-600' role="alert">{errors.password?.message}</p>}
                        </div>
                        <input className='btn btn-primary w-full mt-5' value='Signup' type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;