import React from 'react'

function Loader() {
  return (
    <div className='h-[100vh] w-full flex flex-col justify-center items-center bg-primary'>
      <div className='h-50 w-50 bg-primary absolute right-0 bottom-0 z-2'></div>
      <h1 className='absolute flex justify-center items-end bg-primary text-5xl p-20 right-0 bottom-0 z-20 animate-caret-blink'>Loading...</h1>
        <iframe src='https://my.spline.design/clonercubebinarycopy-CDMrymPlYgQX868z1XFxW6CU/' frameborder='0' width='100%' height='100%'></iframe>
    </div>
  )
}

export default Loader