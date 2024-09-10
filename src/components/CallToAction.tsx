import React from 'react'

const CallToAction: React.FC = () => {
  return (
    <div
      className="text-center py-24 px-8 rounded-xl relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle, transparent 20%, #6b17ff 20%, #6b17ff 90%, transparent 100%, transparent) 0% 0% / 130px 130px,
          radial-gradient(circle, transparent 20%, #6b17ff 20%, #6b17ff 90%, transparent 100%, transparent) 65px 65px / 130px 130px,
          linear-gradient(#dbdbdb 0.5px, transparent 0.5px) 0px -0.25px / 65px 65px,
          linear-gradient(90deg, #dbdbdb 0.5px, #6b17ff 0.5px) -0.25px 0px / 65px 65px,
          #6b17ff
        `,
        backgroundSize: '130px 130px, 130px 130px, 65px 65px, 65px 65px',
        backgroundColor: '#6b17ff',
      }}
    >
      <h2 className="text-white max-w-xl m-auto text-center text:lg sm:text-3xl font-bold mb-6 relative">
        Ditch the Cafes, Find Your Perfect Workspace at Desklinq
      </h2>
      <button className="bg-white text-black font-semibold py-2 px-4 rounded-full relative">
        Get Started
      </button>
    </div>
  )
}

export default CallToAction
