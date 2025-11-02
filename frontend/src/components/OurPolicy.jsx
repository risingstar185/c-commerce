import React from 'react'
import Title from './Title'
import { MdCurrencyExchange } from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";
import { RiCustomerService2Fill } from "react-icons/ri";

const OurPolicy = () => {
  return (
  <div className="w-full bg-gradient-to-l from-[#51b8c4] to-[#2b26ac] py-12 px-4 flex flex-col items-center">
  {/* Title Section */}
  <div className="w-full text-center mb-10">
    <Title text1="Our" text2="Policy" />
    <p className="w-full max-w-2xl mx-auto text-[14px] sm:text-[16px] md:text-[20px] text-white px-2">
      Customer-friendly policies — committed to your satisfaction and safety.
    </p>
  </div>

  {/* Policy Cards */}
  <div className="w-full flex flex-wrap justify-center gap-10 md:gap-16">
    {/* Card 1 */}
    <div className="w-[320px] sm:w-[360px] md:w-[400px] flex flex-col items-center text-center bg-white/10 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform duration-300">
      <MdCurrencyExchange className="text-[#5e34d1] w-[40px] h-[40px] md:w-[60px] md:h-[60px]" />
      <p className="font-semibold text-[18px] md:text-[22px] text-white mt-2">
        Easy Exchange Policy
      </p>
      <p className="font-medium text-[13px] md:text-[16px] text-red-200 mt-2">
        Exchange made easy — quick, simple, and customer-friendly process.
      </p>
    </div>

    {/* Card 2 */}
    <div className="w-[320px] sm:w-[360px] md:w-[400px] flex flex-col items-center text-center bg-white/10 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform duration-300">
      <CiDiscount1 className="text-[#5e34d1] w-[40px] h-[40px] md:w-[60px] md:h-[60px]" />
      <p className="font-semibold text-[18px] md:text-[22px] text-white mt-2">
        7 Days Replacement Policy
      </p>
      <p className="font-medium text-[13px] md:text-[16px] text-red-200 mt-2">
        Shop with confidence — 7 days easy return guarantee.
      </p>
    </div>

    {/* Card 3 */}
    <div className="w-[320px] sm:w-[360px] md:w-[400px] flex flex-col items-center text-center bg-white/10 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform duration-300">
      <RiCustomerService2Fill className="text-[#5e34d1] w-[40px] h-[40px] md:w-[60px] md:h-[60px]" />
      <p className="font-semibold text-[18px] md:text-[22px] text-white mt-2">
        Best Customer Support
      </p>
      <p className="font-medium text-[13px] md:text-[16px] text-red-200 mt-2">
        Trusted customer support — your satisfaction is our priority.
      </p>
    </div>
  </div>
</div>

  )
}

export default OurPolicy
