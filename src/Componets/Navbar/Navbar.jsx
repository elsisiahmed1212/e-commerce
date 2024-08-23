import { Link, NavLink, useNavigate } from 'react-router-dom';
import logoo from '../../assets/logo.svg'
import { useContext, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { auth } from '../Contextapi/ContextProfider';
import { useQuerycart } from '../Hooks/useQuerycart';
import { getcart } from '../../Apis/cartApi';
function Navbar() {

    let {data}= useQuerycart('getcart',getcart)
    
    
    let Navigate = useNavigate()
    let [closenav , setclosenave] = useState(false)
    let {setlogin,islogin} = useContext(auth)
    const closenaving = ()=>{
        setclosenave(!closenav)
    }
    function logout() {
        localStorage.removeItem('usertoken')
        setlogin(null)
        Navigate('/login')
    }
    return ( 
    <>
        <nav className="bg-gray-100 p-4">
            <div className="container md:flex  justify-between items-center relative">
                <div className="logo-uls md:flex gap-10 items-center">
                    <div className="logo">
                        <NavLink to={'/'}><img src={logoo} alt="" /></NavLink>
                    </div>
                    <div className= {`nav-link md:flex gap-10 ${closenav?'block':'hidden'}`}>
                        {islogin?
                        <ul className="md:flex gap-5">
                            <li><NavLink to={'/'}>Home</NavLink></li>
                            <li><NavLink to={'/Prodoucts'}>Product</NavLink></li>
                            <li><NavLink to={'/wishlist'}>wishlist</NavLink></li>
                            <li><NavLink to={'/categories'}>Categories</NavLink></li>
                            <li><NavLink to={'/brand'}>Brands</NavLink></li>
                        </ul>:''}
                        
                    </div>
                </div>    
                <div>
                    <ul className={`md:flex gap-10 items-center ${closenav?'block':'hidden'}`}>
                    {islogin?<li className='relative'>
                        <Link to={'/cart'}>
                            <i className='fas fa-cart-shopping'></i>
                            <span className='w-[20px] h-[20px] absolute bottom-3 left-3 bg-green-700 rounded-full flex justify-center items-center text-white'>{data?.data?.numOfCartItems?data?.data?.numOfCartItems:0}</span>
                        </Link>
                </li>:''}
                    {islogin?
                    
                    <li className='cursor-pointer' onClick={logout}>Log Out {islogin?<b className='text-green-500'>Hi {islogin.name}</b>
                    
                    :''}</li>:
                    <>
                        <li className='flex  gap-5'>
                            <a href=""><i className="fa-brands fa-instagram"></i></a>
                            <a href=""><i className="fa-brands fa-facebook"></i></a>
                            <a href=""><i className="fa-brands fa-tiktok"></i></a>
                            <a href=""><i className="fa-brands fa-twitter"></i></a>
                            <a href=""><i className="fa-brands fa-linkedin"></i></a>
                            <a href=""><i className="fa-brands fa-youtube"></i></a>
                        </li>
                        <li><NavLink to={'/login'}>Login</NavLink></li>
                        <li><NavLink to={'/register'}>Register</NavLink></li>
                    </>
                    }

                    </ul>
                </div>
            </div>
            <i className={`fas ${closenav?'fa-closenave':'fa-bars'} fa-2x absolute  top-5 right-6 cursor-pointer md:hidden`} onClick={closenaving}></i>
        </nav>
    </> 
    );
}

export default Navbar;