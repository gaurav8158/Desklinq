import React from 'react'
import logo1 from '../../public/images/trusted/logo1.svg'
import logo2 from '../../public/images/trusted/logo2.svg'
import logo3 from '../../public/images/trusted/logo3.svg'
import logo4 from '../../public/images/trusted/logo4.svg'
import logo5 from '../../public/images/trusted/logo5.svg'
import Image from 'next/image'
const TrustedBySection: React.FC = () => {
  const logos = [
    { src: logo1, alt: 'Logo 1' },
    { src: logo2, alt: 'Logo 2' },
    { src: logo3, alt: 'Logo 3' },
    { src: logo4, alt: 'Logo 4' },
    { src: logo5, alt: 'Logo 5' },
  ]
  return (
    <div className="trusted-by-section text-center py-8">
      <p className="text-lg mb-4">
        Our Workspaces are trusted by more than{' '}
        <span className="text-[#6115E7]">25+</span> Startups
      </p>
      <div className="flex mt-8 justify-center items-center space-x-8">
        {logos.map((logo, index) => (
          <div className="w-44 h-32">
            <Image key={index} src={logo.src} alt={logo.alt} className="h-12" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrustedBySection
