import { Link } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import LoginImage from "../assets/Sign up-illustration.svg"
import axios from "axios";


function Signup() {

  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("https://invenhub-2.onrender.com/api/v1/user/register", {
      fullName,
      email,
      password
    });
    toast.success(`${response.data.message}`);
  } catch (error) {
    console.log("Error during signup:",error);
    toast.error(
  <div>
    {error.response?.data?.message.split('\n').map((line, index) => (
      <p key={index}>{line}</p>
    )) || "Signup Failed"}
  </div>
);

  }
};
  return (
    <>
      <div className="h-auto flex my-10">
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
              <h1 className="text-4xl font-bold mb-5">Create an Account</h1>
              <p className="mb-2">Never lose track of an item again.</p>
            </div>

            {/* <!-- Form --> */}
            <form id="signupForm" className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-[var(--primary)]">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="fullName"
                    type="string"
                    placeholder="John Doe"
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    required
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
              {/* <!-- Email Field --> */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-[var(--primary)]">
                  E-mail
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* <!-- Password Field --> */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-[var(--primary)]">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
              </div>

              {/* <!-- Confirm Password Field --> */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[var(--primary)]">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    required
                    />
                </div>
              </div>

              {/* <!-- Sign Up Button --> */}
              <button
                type="submit"
                className="w-full text-foreground bg-[var(--primary)] hover:bg-[var(--primary-hover)] focus:bg-[var(--primary-hover)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-lg font-medium transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 focus:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--primary-hover)]"
              >
                Sign up
              </button>


              {/* <!-- Divider --> */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-background">or sign up with</span>
                </div>
              </div>

              {/* <!-- Social Signup Buttons --> */}
              <div className="">
                <button type="button" className="w-full flex justify-center items-center py-3 border border-gray-300 rounded-lg hover:bg-card transition-colors duration-200">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <p className='ml-5 font-light'>Sign up using Google</p>
                </button>
              </div>
            </form>

            {/* <!-- Login Link --> */}
            <div className="mt-8 text-center">
              <p className="">
                Already have an account? 
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-light"> Log in</Link>
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
  );
}

export default Signup;