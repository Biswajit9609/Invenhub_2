import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "../components/Navbar.jsx"
import image from "../assets/industry-sales-background.png"
function Landing() {
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    gsap.to(".horizontalScroll",{
        transform: "translateX(-200%)",
        scrollTrigger:{
            trigger: ".horizontalScroll",
            start : "top 0%",
            end: "top -400%",
            scrub: 2,
            pin: true        
        }
    })
    const tl = gsap.timeline()
    tl.from(".ani-text",{
      y: 100,
      opacity: 0,
      duration: 1.5,
      stagger: 0.4,
      delay: 0.5,
      ease: "power3.out"
    })
  }, []);
  return (
    <>
      <div className="landing">
        <Navbar />
        <div className="page-one h-[100dvh] z-10">
            <div className="h-full">
              <div className="text h-full w-full lg:w-8/12 flex flex-col justify-center items-center font-semibold">
                <img className="block lg:hidden mb-10 w-[80%]" src={image} alt="" />
                <h1 className='ani-text text-[3.2rem] md:text-8xl leading-none'>Your <span className='font text-[var(--primary)]'>Store</span></h1>
                <h1 className='ani-text text-[3.2rem] md:text-8xl leading-tight'>in Your <span className='font text-[var(--primary)] inline'>Pocket</span></h1>
                <h3 className='ani-text lg:text-2xl mt-3 font-light px-[5vw] text-center'>Track stock levels, print barcode labels, sell faster, and get <span className='lg:block'>AI-powered predictions — from your phone.</span></h3>
              </div>
              <iframe className="hidden lg:block absolute left-100 top-15 z-30 max-w-[1568px] max-h-[818px] scale-100" src='https://my.spline.design/genkubgreetingrobot-q95MSKpuz9jRfgmiiVNTjz2h/' frameborder='0' width='1568px' height='768px'></iframe>
            </div>
        </div>
        <div className="page-two h-[100dvh] flex justify-center items-center bg-background">
          <div className="horizontalScrollcontainer h-full">
            <div className="horizontalScroll flex h-full w-[100vw]">
              <div className="horizontalScrollItem h-full w-full shrink-0 flex flex-col justify-center items-center">
                <h1 className='py-5 text-7xl font-bold bg-gradient-to-r from-[#2a9c8d] to-gray-800 bg-clip-text text-transparent'>Real-time Tracking</h1>
                <p className='text-lg mt-10'>Monitor every item across all locations with millisecond precision and predictive<span className="block text-center">analytics</span></p>
                <div className="h-[30%] w-[50%] flex justify-between items-center mt-7">
                  <div className="feature h-full w-3/10 rounded-lg flex flex-col justify-center items-center bg-card border-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-database-icon lucide-database"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
                    <h3 className="mt-5 font-bold">Live Data</h3>
                    <p className="text-center mt-2 px-5 text-muted-foreground">Real-time inventory updates across all channels</p>
                  </div>
                  <div className="feature h-full w-3/10 rounded-lg flex flex-col justify-center items-center bg-card border-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cpu-icon lucide-cpu"><path d="M12 20v2"/><path d="M12 2v2"/><path d="M17 20v2"/><path d="M17 2v2"/><path d="M2 12h2"/><path d="M2 17h2"/><path d="M2 7h2"/><path d="M20 12h2"/><path d="M20 17h2"/><path d="M20 7h2"/><path d="M7 20v2"/><path d="M7 2v2"/><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/></svg>
                    <h3 className="mt-5 font-bold">AI Predictions</h3>
                    <p className="text-center mt-2 px-5 text-muted-foreground">Smart forecasting with machine learning</p>
                  </div>
                  <div className="feature h-full w-3/10 rounded-lg flex flex-col justify-center items-center bg-card border-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe-icon lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                    <h3 className="mt-5 font-bold">Global Sync</h3>
                    <p className="text-center mt-2 px-5 text-muted-foreground">Synchronized data across all locations</p>
                  </div>
                </div>
              </div>
              <div className="horizontalScrollItem h-full w-full shrink-0 flex flex-col justify-center items-center">
                <h1 className='text-7xl font-semibold bg-gradient-to-r from-purple-600 to-[#2a9c8d] bg-clip-text text-transparent'>Advanced Analytics</h1>
                <p className='text-lg mt-10'>Unlock insights with AI-powered analytics that transform data into actionable intelligence</p>
                <div className="h-[20%] w-[50%] flex justify-between items-center mt-7 bg-card rounded-2xl border-1">
                  <div className='w-4/12 flex flex-col justify-center items-center'>
                    <h1 className='text-4xl font-semibold'>95%</h1>
                    <p className='mt-3 text-center'>Forecast Accuracy</p>
                  </div>
                  <div className='w-4/12 flex flex-col justify-center items-center'>
                    <h1 className='text-4xl font-semibold'>40%</h1>
                    <p className='mt-3 text-center'>Cost Savings</p>
                  </div>
                  <div className='w-4/12 flex flex-col justify-center items-center'>
                    <h1 className='text-4xl font-semibold'>80%</h1>
                    <p className='mt-3 text-center'>Time Reduction</p>
                  </div>
                  <div className='w-4/12 flex flex-col justify-center items-center'>
                    <h1 className='text-4xl font-semibold'>99%</h1>
                    <p className='mt-3 text-center'>Uptime</p>
                  </div>
                </div>
              </div>
              <div className="horizontalScrollItem h-full w-full shrink-0 flex flex-col justify-center items-center">
                <h1 className='text-7xl font-semibold bg-gradient-to-r from-green-600 to-[#2a9c8d] bg-clip-text text-transparent'>Smart Automation</h1>
                <p className='text-lg mt-10'>Automate complex workflows with intelligent systems that learn and adapt</p>
                <div className="h-[35%] w-[50%] flex justify-evenly items-center mt-7">
                  <div className="feature h-full w-5/11 rounded-lg flex flex-col justify-center items-center bg-card border-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-keyhole-icon lucide-lock-keyhole"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>
                    <h3 className="mt-5 font-bold text-xl">Secure & Compliant</h3>
                    <p className="text-center mt-2 px-5 text-muted-foreground">Enterprise-grade security with full compliance</p>
                  </div>
                  <div className="feature h-full w-5/11 rounded-lg flex flex-col justify-center items-center bg-card border-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tablet-smartphone-icon lucide-tablet-smartphone"><rect width="10" height="14" x="3" y="8" rx="2"/><path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4"/><path d="M8 18h.01"/></svg>
                    <h3 className="mt-5 font-bold text-xl">Mobile First</h3>
                    <p className="text-center mt-2 px-5 text-muted-foreground">Manage inventory anywhere with our mobile app</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing