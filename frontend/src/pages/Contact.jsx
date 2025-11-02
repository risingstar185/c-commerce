import React, { useState } from 'react'
import Title from '../components/Title'
import contactImg from '../assets/vcart logo.png'
import { toast } from 'react-toastify'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill all the fields')
      return
    }

    toast.success('Message sent successfully!')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="w-full min-h-screen  pt-[280px]  bg-gradient-to-l from-[#51b8c4] to-[#2b26ac] flex flex-col items-center justify-center py-16 px-6 md:px-12">
      {/* Title */}
      <Title text1="Contact Us" />

      {/* Main Section */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-12 mt-10">
        {/* Contact Info / Image Section */}
        <div className="lg:w-1/2 w-full flex flex-col items-center lg:items-start text-white space-y-6">
          <img
            src={contactImg}
            alt="Contact OneCart"
            className="w-[65%] lg:w-[60%] h-[300px] object-contain rounded-md shadow-lg mb-6"
          />
          <h2 className="text-[28px] md:text-[32px] font-bold">We’d love to hear from you!</h2>
          <p className="text-[16px] md:text-[18px] leading-relaxed max-w-md">
            Have a question, feedback, or just want to say hello? Reach out to our support team. We’re always here to help make your shopping experience smooth and enjoyable.
          </p>

          <div className="space-y-3 mt-4">
            <p className="text-[16px] md:text-[18px]">
              📍 <span className="font-semibold">Address:</span> 123 Market Street, Mumbai, India
            </p>
            <p className="text-[16px] md:text-[18px]">
              📞 <span className="font-semibold">Phone:</span> +91 98765 43210
            </p>
            <p className="text-[16px] md:text-[18px]">
              📧 <span className="font-semibold">Email:</span> support@onecart.com
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:w-1/2 w-full bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-lg shadow-lg text-white">
          <h3 className="text-[24px] md:text-[28px] font-bold mb-4 text-center">Send Us a Message</h3>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-white/20 placeholder-white text-white outline-none focus:ring-2 focus:ring-white"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-white/20 placeholder-white text-white outline-none focus:ring-2 focus:ring-white"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full p-3 rounded-md bg-white/20 placeholder-white text-white outline-none focus:ring-2 focus:ring-white resize-none"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-[#2e3030c9] hover:bg-[#1f1f1f] rounded-md shadow-md transition-all text-[16px] font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Map / Footer Section */}
      <div className="w-full mt-20 flex flex-col items-center text-center text-white">
        <h2 className="text-[26px] md:text-[30px] font-bold mb-6">Find Us on Map</h2>
        <iframe
          title="OneCart Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.839054218844!2d72.87765597498884!3d19.118719551977578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8723b60b6cf%3A0x96c4b1a72d8ad11a!2sMumbai%20India!5e0!3m2!1sen!2sin!4v1699092906183!5m2!1sen!2sin"
          className="w-full max-w-4xl h-[300px] rounded-lg border border-white/30 shadow-lg"
          loading="lazy"
        ></iframe>
      </div>

      {/* Footer Note */}
      <div className="w-full mt-20 border-t border-white/40 pt-6 text-center text-white text-sm md:text-base">
        © 2025 OneCart.com — We’re here to help you 24/7. Designed with ❤️ for smarter shopping.
      </div>
    </div>
  )
}

export default Contact
