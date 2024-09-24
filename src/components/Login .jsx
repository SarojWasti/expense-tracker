import { useState } from "react";
import React from "react";
import { signInWithPopup, auth, provider } from "../services/firebase";
import { useNavigate } from "react-router-dom";
useNavigate

const Login = () => {
    const navigate = useNavigate();

    const [visible, setShowPassword] = useState(true);

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider);
            navigate('/test');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="loginStyle">
            <div className="rounded p-2 sm:w-[36rem]">
                <h2 className="text-3xl font-bold text-customRed">Expense Tracker</h2>
                <h1 className="text-2xl font-bold mt-[4rem] mb-4">Welcome!</h1>
                <p>Create a new account or Login using Google!</p>
                <div className="mb-4 mt-8">
                    <input placeholder="Email" type="text" className="w-full p-2 border-b-2 bg-gray-100 border-black focus:outline-none"
                    />
                </div>
                <div className="mb-4 relative">
                    <input placeholder="Password" type={visible ? 'password':'text'} className="w-full p-2 border-b-2 bg-gray-100 border-black focus:outline-none"/>
                    <button className="absolute right-2 top-2" type="button"onClick={() => setShowPassword(!visible)}>
                        {visible ? <i className="fa fa-eye" aria-hidden="true"></i> : <i className="fa fa-eye-slash" aria-hidden="true"></i>}
                    </button>
                </div>
                <div className="mt-12">
                    <button 
                    className="w-full border-none text-sm text-white
                     bg-customRed p-2 rounded-lg hover:shadow-lg transition-all duration-300">
                        Login
                    </button>
                </div>
                <div className="mt-6">
                    <button onClick={signInWithGoogle} 
                    className="w-full border border-gray-300 p-3 text-sm 
                    rounded-lg flex items-center justify-center 
                    hover:bg-gray-100 hover:shadow-md transition-all duration-300">
                        <span className="mr-2">
                        <i className="fab fa-google"></i>
                        </span>
                        Continue with Google
                    </button>
                </div>
                <div className="mt-6 flex texxt-center justify-center">
                    <a onClick={()=>navigate('/signup')} className="text-customRed cursor-pointer text-sm hover:underline">
                        Create a new account
                    </a>
                </div>
            </div>
        </div>
    );
  };
  
  export default Login;
  