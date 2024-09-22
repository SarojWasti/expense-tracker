import { useState } from "react";

const Login = () => {
    const [visible, setShowPassword] = useState(true);
    return (
        <div className="loginStyle">
            <div className="rounded w-[36rem]">
                <h2 className="text-3xl font-bold">Expense Tracker</h2>
                <h1 className="text-3xl font-bold mt-[4rem] mb-4">Welcome!</h1>
                <p>Create a new account or Login using Google!</p>
                <div className="mb-4 mt-8">
                    <input placeholder="Email" type="text" className="w-full p-2 border-b-2 bg-gray-100 border-black focus:outline-none"
                    />
                </div>
                <div className="mb-4 relative">
                    <input placeholder="Password" type={visible ? 'password':'text'} className="w-full p-2 border-b-2 bg-gray-100 border-black focus:outline-none"/>
                    <button className="absolute right-2 top-2" type="button"onClick={() => setShowPassword(!visible)}>
                        {visible ? <i class="fa fa-eye" aria-hidden="true"></i> : <i class="fa fa-eye-slash" aria-hidden="true"></i>}
                    </button>
                </div>
                <div className="mt-12">
                    <button className="w-full border-none text-white bg-black p-2 rounded-lg">
                        Login
                    </button>
                </div>
                <div className="mt-6">
                    <button className="w-full border border-gray-300 p-2 rounded-lg flex items-center justify-center hover:bg-gray-100">
                        <span className="mr-2">
                        <i className="fab fa-google"></i>
                        </span>
                        Sign Up with Google
                    </button>
                </div>
            </div>
        </div>
    );
  };
  
  export default Login;
  