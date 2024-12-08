import React from 'react'

function Intro() {
  return (
<div>
  <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-2 pt-4 text-center">
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white font-playfair">
      The
    </h1>
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-pink-500 font-playfair">
      Entrepreneurial
    </h1>
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white font-playfair">
      Horizon
    </h1>
  </div>
  <h2 className='text-white text-3xl text-center font-serif leading-relaxed max-w-screen-lg mx-auto p-4'>"Inspiring Ideas, Stories, and Strategies for Tomorrow's Leaders."</h2>
  <p className=" text-white text-lg text-center font-serif leading-relaxed max-w-screen-lg mx-auto p-4">
  The Entrepreneurial Horizon is your gateway to exploring the limitless possibilities of innovation and enterprise. With a focus on inspiring stories, insightful analyses, and actionable advice, this blog captures the essence of entrepreneurship in a dynamic world. Whether you're a budding visionary or a seasoned leader, *The Entrepreneurial Horizon* offers a platform to navigate challenges, celebrate successes, and envision the future of business with clarity and purpose.
  </p>
</div>

  )
}

export default Intro