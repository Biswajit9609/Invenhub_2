import { 
    Link,
    useNavigate  
} from "react-router-dom"
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import axios from "axios";
import LoginImage from "../assets/login-illustration.svg"
function Login() {
    const navigate = useNavigate();
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:3000/api/v1/user/login", {
          email,
          password
        });
        navigate('/dashboard');
        toast.success(`${response.data.message}`);
      } catch (error) {
        console.log("Error during Login:",error);
        toast.error(error.response?.data?.message || "Login Failed");
      }
    };
  return (
    <>
        <div className="h-[100dvh] flex">
        <Toaster />
        {/* <!-- Left Column - Form --> */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:py-8 lg:px-16 xl:px-24">
            <div className="w-full max-w-md mx-auto">
                {/* <!-- Logo --> */}
                <div className="flex items-center mb-10">
                    <span className="text-4xl font-semibold font">Inven<span className='text-[var(--primary)]'>Hub</span></span>
                </div>

                {/* <!-- Form Header --> */}
                <div className="mb-8">
                    <h1 className="text-5xl font-bold mb-5">Welcome back!</h1>
                    <p className="mb-2">Login to your Account.</p>
                </div>

                {/* <!-- Form --> */}
                <form id="signupForm" className="space-y-6" onSubmit={handleSubmit}>
                    {/* <!-- Email Field --> */}
                    <div className="space-y-2">
                        <label for="email" className="block text-sm font-medium text-[var(--primary)]">
                            E-mail
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                placeholder="example@email.com"
                                className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                required
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                    </div>

                    {/* <!-- Password Field --> */}
                    <div className="space-y-2">
                        <label for="password" className="block text-sm font-medium text-[var(--primary)]">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                required
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                id="togglePassword"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                <svg id="eyeIcon" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                                <svg id="eyeOffIcon" className="h-5 w-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className='flex justify-end'><a href="#" className="text-blue-600 hover:text-blue-700 font-light">Forgot password?</a></div>

                    {/* <!-- Sign In Button --> */}
                    <button
                        type="submit"
                        className="w-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-foreground py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                        Sign in
                    </button>

                    {/* <!-- Divider --> */}
                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-[var(--background)]">or sign in with</span>
                        </div>
                    </div>

                    {/* <!-- Social Login Buttons --> */}
                    <div className="">
                        <button type="button" className="w-full flex justify-center items-center py-3 border border-gray-300 rounded-lg hover:bg-card transition-colors duration-200">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            <p className='ml-5 font-light'>Sign in using Google</p>
                        </button>
                    </div>
                </form>

                {/* <!-- Sign Up Link --> */}
                <div className="mt-8 text-center">
                    <p className="">
                        New here? 
                        <Link to="/sign-up" className="text-blue-600 hover:text-blue-700 font-light"> Create a account</Link>
                    </p>
                </div>
            </div>
        </div>

        {/* <!-- Right Column - Background --> */}
        <div className="hidden lg:block lg:flex-1 overflow-hidden my-auto">
            <img src={LoginImage} alt="" />
        </div>
    </div>
    </>
  )
}

export default Login