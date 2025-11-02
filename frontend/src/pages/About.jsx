import React from 'react'
import Title from '../components/Title'
import about from '../assets/vcart logo.png'
import NewLatter from '../components/NewLatter'

const About = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-l pt-[300px] from-[#51b8c4] to-[#2b26ac] flex flex-col items-center justify-center py-16 px-6 md:px-12">
      {/* Title */}
      <Title text1="About Us" />

      {/* Main Content */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-10 mt-8">
        {/* Image Section */}
        <div className="lg:w-1/2 w-full flex items-center justify-center">
          <img
            src={about}
            alt="About OneCart"
            className="w-[80%] lg:w-[65%] h-auto max-h-[400px] object-contain rounded-md shadow-lg"
          />
        </div>

        {/* Text Section */}
        <div className="lg:w-1/2 w-full flex flex-col items-start justify-center gap-5 text-white">
          <p className="text-[18px] md:text-[20px] leading-relaxed">
            <span className="font-semibold text-white text-[22px]">OneCart</span> was born for smart, seamless shopping — created to deliver quality
            products, trending styles, and everyday essentials all in one place. We’re passionate about making your online shopping experience
            simple, smooth, and secure — because convenience shouldn’t come with compromise.
          </p>

          <h2 className="text-[28px] md:text-[32px] font-bold mt-4 text-white">Our Mission</h2>
          <p className="text-[16px] md:text-[18px] leading-relaxed">
            Our mission is to empower every shopper with easy access to top-quality products at the best prices. We aim to bridge the gap between
            quality and affordability while ensuring a delightful digital shopping experience for all.
          </p>

          <h2 className="text-[28px] md:text-[32px] font-bold mt-4 text-white">Our Vision</h2>
          <p className="text-[16px] md:text-[18px] leading-relaxed">
            We envision a world where online shopping is effortless, personalized, and enjoyable — where technology connects you to what you love
            faster and smarter than ever.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="w-full mt-16 text-center text-white flex flex-col items-center">
        <h2 className="text-[28px] md:text-[32px] font-bold mb-4">Why Choose OneCart?</h2>
        <p className="max-w-3xl text-[16px] md:text-[18px] leading-relaxed">
          At OneCart, we go beyond transactions — we build trust. From curated collections to fast delivery, secure payments, and 24/7 customer
          support, we’re redefining what convenience means. Our team works tirelessly to bring you exclusive offers, sustainable products, and a
          shopping experience that feels as personal as it is powerful.
        </p>
      </div>

      {/* Customer Reviews Section */}
      <div className="w-full mt-16 text-center text-white flex flex-col items-center">
        <h2 className="text-[28px] md:text-[32px] font-bold mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
          {/* Review Card 1 */}
          <div className="bg-white/10 p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
            <p className="text-[16px] italic">"OneCart made my shopping so easy! The delivery was fast and the product quality is top-notch."</p>
            <h3 className="mt-4 font-semibold text-white">— Priya Sharma</h3>
          </div>

          {/* Review Card 2 */}
          <div className="bg-white/10 p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
            <p className="text-[16px] italic">"I love the variety and the discounts. Definitely my go-to platform for online shopping!"</p>
            <h3 className="mt-4 font-semibold text-white">— Aarav Mehta</h3>
          </div>

          {/* Review Card 3 */}
          <div className="bg-white/10 p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
            <p className="text-[16px] italic">"Customer support is amazing! They resolved my query instantly and were super polite."</p>
            <h3 className="mt-4 font-semibold text-white">— Neha Patel</h3>
          </div>
        </div>
      </div>

      {/* Useful Links Section */}
      <div className="w-full mt-20 flex flex-col items-center text-center text-white">
        <h2 className="text-[28px] md:text-[32px] font-bold mb-6">Quick Links</h2>
        <div className="flex flex-wrap justify-center gap-6 text-[16px] md:text-[18px]">
          <a href="/" className="hover:underline hover:text-gray-200">Home</a>
          <a href="/shop" className="hover:underline hover:text-gray-200">Shop</a>
          <a href="/contact" className="hover:underline hover:text-gray-200">Contact Us</a>
          <a href="/faq" className="hover:underline hover:text-gray-200">FAQ</a>
          <a href="/terms" className="hover:underline hover:text-gray-200">Terms & Conditions</a>
        </div>
      </div>

      {/* Footer Note */}
      <div className="w-full mt-20 border-t border-white/40 pt-6 text-center text-white text-sm md:text-base">
        © 2025 OneCart.com — Designed with ❤️ for smarter shopping experiences.
      </div>
    
    </div>
  )
}

export default About
