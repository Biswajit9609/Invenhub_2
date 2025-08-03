import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import axios from "axios";
import SignupImage from "../assets/Sign up-illustration.svg";
import LoadingSpinner from "../components/LoadingSpinner"; // Make sure to import the spinner

function OtpVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false); // State for verification loading

  const inputRefs = useRef([]);
  const location = useLocation();
  const email = location.state?.email || "your email address"; // Fallback for display

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResending(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    setIsVerifying(true); // Start verifying loader
    try {
      const response = await axios.post("https://invenhub-2.onrender.com/api/v1/user/verify-email", {
        code: enteredOtp,
      });
      toast.success(`${response.data.message}`);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.log("Error during OTP verification:", error);
      toast.error(error.response?.data?.message || "Verification Failed");
    } finally {
      setIsVerifying(false); // Stop verifying loader
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      const response = await axios.post("https://invenhub-2.onrender.com/api/v1/user/resend-otp", {
        email,
      });
      toast.success(response.data.message);
      setTimer(60); // Reset timer on successful resend
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error(error.response?.data?.message || "Failed to resend OTP.");
      setIsResending(false); // Stop loader on error
    }
  };

  return (
    <>
      <div className="h-auto flex py-10 max-h-[100dvh]">
        <Toaster richColors position="top-center" />
        <div className="flex-1 flex flex-col justify-center px-8 lg:py-8 lg:px-16 xl:px-24">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center mb-10">
              <span className="text-4xl font-semibold font">Inven<span className='text-[var(--primary)]'>Hub</span></span>
            </div>

            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold mb-4">Verify Your Account</h1>
              <p className="mb-2">
                We've sent a 6-digit verification code to <br />
                <span className="font-semibold text-[var(--primary)]">{email}</span>
              </p>
            </div>

            <form id="otpForm" className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <label htmlFor="otp" className="block text-sm font-medium text-center text-gray-700">
                  Enter Your Code
                </label>
                <div className="flex justify-center gap-2 sm:gap-3">
                  {otp.map((data, index) => (
                    <input
                      ref={(el) => (inputRefs.current[index] = el)}
                      className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
                      type="text"
                      name="otp"
                      maxLength="1"
                      key={index}
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onFocus={(e) => e.target.select()}
                      disabled={isVerifying}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isVerifying || otp.join("").length < 6}
                className="w-full flex justify-center items-center text-foreground bg-[var(--primary)] hover:bg-[var(--primary-hover)] focus:bg-[var(--primary-hover)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-lg font-medium transition-all duration-200 ease-in-out"
              >
                {isVerifying ? <LoadingSpinner /> : "Verify Account"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm">
                Didn't receive the code?{" "}
                <button
                  onClick={handleResendOtp}
                  disabled={timer > 0 || isResending}
                  className="font-medium text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {isResending ? <LoadingSpinner /> : `Resend Code ${timer > 0 ? `in ${timer}s` : ""}`}
                </button>
              </p>
              <p className="mt-4">
                <Link to="/signup" className="text-sm text-gray-600 hover:text-gray-800 font-light">
                  &larr; Back to Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="hidden lg:block lg:flex-1 overflow-hidden my-auto">
          <img src={SignupImage} alt="Verification Illustration" />
        </div>
      </div>
    </>
  );
}

export default OtpVerification;
