import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState ,useContext}from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { auth } from '../Contextapi/ContextProfider';
import { jwtDecode } from "jwt-decode";
function NewPassword() {
    // vanila js valadation
    /*
    function validation(value) {

        // using vanila js 
       
        let error = {};
        if (!value.name) {
            error.name = 'Name is required';
        } else if (!/^[A-Z][a-zA-Z\s'-]{2,49}$/.test(value.name)) {
            error.name = 'Name does not match the required pattern';
        }
    
        return error;
        
    }
    */
    let navigate = useNavigate()
    let [lodaing,setlodaing] = useState(false)
    let[massage,setmassage]= useState('')
    let {setlogin} = useContext(auth)
    function hsndelnewpassword(value){
        setlodaing(true)
        axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',value)
        .then(({data})=>{               
            if(data.token){
                setlodaing(false)
                setmassage('')
                navigate('/login')
            }
            
        }).catch((erore)=>{
            setmassage(erore.response.data.message)
            setlodaing(false)
        })
    }

    let valadationform = Yup.object({
        email:Yup.string().email().required('email is required'),
        newPassword:Yup.string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required('Password is required'),
    })

    let formik = useFormik({
    initialValues:{
        email:'',
        newPassword:'',
    },
    /*
    validate:validation,
    */
    validationSchema:valadationform,
    onSubmit:hsndelnewpassword
   })

    return (
        <div className="container h-screen items-center">
        <form class="w-full mx-auto my-52" onSubmit={formik.handleSubmit}>
            {massage?<div className="mx-auto p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{massage}</span> 
            </div>:''}
            <div class="relative z-0 w-full mb-5 group">
                <input type="email" onChange={formik.handleChange}  value={formik.values.email}  id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            </div>
            {/* allert */}
            {formik.errors.email && formik.touched.email?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.email}</span> 
            </div>:''}
            <div class="relative z-0 w-full mb-5 group">
                <input type="password" onChange={formik.handleChange}  value={formik.values.newPassword}  id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">new Password</label>
            </div>
            {/* allert */}
            {formik.errors.newPassword && formik.touched.newPassword?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.newPassword}</span> 
            </div>:''}
            <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
               {lodaing?<i className='fas fa-spin fa-spinner text-white'></i>:'Submit'} </button>
        </form>
        </div>
    );
}

export default NewPassword;