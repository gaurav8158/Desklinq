"use client"
import React, { useState } from 'react'
import Faquestion from './Faquestion'
interface FaqProps {
  page: string
}
const Faq: React.FC<FaqProps> = ({ page }) => {
  const [more, setMore] = useState(false)
  const handleMore = () => {
    setMore(!more)
  }
  return (
    <section
      className={`relative z-20 overflow-hidden dark:bg-dark ${
        page === 'main' ? '' : 'bg-gray-50 py-10'
      }`}
    >
      <div className="container mx-auto">
        <div
          className={`  ${page === 'main' ? 'flex flex-wrap' : 'hidden'} -mx-4`}
        >
          <div className="w-full px-4">
            <div className="mx-auto text-center lg:mb-20">
              <h2 className="mb-4 text-2xl font-semibold text-dark dark:text-white sm:text-[40px]/[48px]">
                Frequently Asked Questions
              </h2>
              <span className="mb-2 block text-lg font-semibold text-primary">
                Any Questions? Look Here
              </span>
            </div>
          </div>
        </div>
        <div className="flex ">
          <div
            className={`flex  ${
              page === 'main' ? 'hidden' : 'hidden lg:block w-1/2'
            }  flex-col   bg-gray-50 p-4`}
          >
            {/* Heading */}
            <h1 className="text-4xl font-bold text-gray-800 mb-6">FAQs</h1>

            {/* Input Box */}
            <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
              <textarea
                className="w-full h-28 p-4 text-gray-700 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                placeholder="Ask us what you want to know..."
              ></textarea>

              {/* Description */}

              {/* Send Button */}
              <div className="flex items-start mt-6">
                <p className="text-sm text-gray-500 ">
                  We will answer your questions via email within 48 hours.
                </p>
                <button className="bg-[#6115E7] text-white font-semibold py-2 px-6 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none">
                  Send
                </button>
              </div>
            </div>
          </div>
          <div className={`flex w-full  ${page === 'main' ? '' : 'lg:w-1/2'} `}>
            <Faquestion />
          </div>
        </div>
      </div>

      {/* <div className="absolute bottom-0 right-0 z-[-1]">
         <svg
          width="1440"
          height="886"
          viewBox="0 0 1440 886"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        > 
          <path
            opacity="0.5"
            d="M193.307 -273.321L1480.87 1014.24L1121.85 1373.26C1121.85 1373.26 731.745 983.231 478.513 729.927C225.976 477.317 -165.714 85.6993 -165.714 85.6993L193.307 -273.321Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="1308.65"
              y1="1142.58"
              x2="602.827"
              y2="-418.681"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#3056D3" stop-opacity="0.36" />
              <stop offset="1" stop-color="#F5F2FD" stop-opacity="0" />
              <stop offset="1" stop-color="#F5F2FD" stop-opacity="0.096144" />
            </linearGradient>
          </defs>
        </svg>
      </div> */}
    </section>
  )
}

export default Faq
