import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import logo from '../../assets/logo.png';

const Header = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.error(err));
    }


    const menuItems = <React.Fragment>

        <li><Link to='/'>Home</Link></li>
        <li><Link to='/posts'>Posts</Link></li>


        {
            user?.uid ?
                <>
                    <li><button onClick={handleLogOut}>Sign Out</button></li>
                </>
                :
                <>
                    <li><Link to='/signin'>SignIn</Link></li>
                    <li><Link to='/signup'>SignUp</Link></li>
                </>

        }
    </React.Fragment>

    return (
        <div className='bg-blue-600 px-5'>
            <div className="navbar flex justify-between">
                <div className="navbar-start">
                    <label tabIndex={2} htmlFor="dashboard-drawer" className="btn btn-ghost text-white lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>

                    <div className='flex text-white'>
                        <Link to='/' className="btn btn-ghost normal-case text-lg md:text-xl"><img src={logo} className="w-12 md:w-16" alt="" />Social Sharing</Link>
                    </div>
                </div>
                <div className="navbar-end hidden lg:flex text-white">
                    <ul className="menu menu-horizontal p-0">
                        {menuItems}
                    </ul>
                </div>
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost text-white lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 w-40 absolute right-0 z-10 p-2 shadow rounded-box bg-[#364F6B] text-white">
                        {menuItems}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;