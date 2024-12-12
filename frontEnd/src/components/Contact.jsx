import React from 'react'

function Contact() {
  return (
  <div id='contact' className="text-white max-w-screen-lg mx-auto p-4">
    <div className='flex gap-2 justify-center'>
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-6">Contact</h1>
    <h1 className="text-4xl text-pink-500 sm:text-5xl md:text-6xl font-bold text-center mb-6">Us</h1>
    </div>
    <p className="text-lg text-center font-serif leading-relaxed">E-mail: <a href="https://www.gmail.com">ecellnita@gmail.com</a></p>
    <p className="text-lg text-center font-serif leading-relaxed">Phone: +91 6291564243</p>
    <p className="text-lg text-center font-serif leading-relaxed">Address: National Institute of Technology Agartala
    Jirania , West Tripura
    Pin - 799046</p>
    </div>
  )
}

export default Contact