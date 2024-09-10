import React from 'react'
import {
  ChartLineUp,
  CalendarCheck,
  ArrowsOutCardinal,
  UsersThree,
  Lightbulb,
  Star,
} from 'phosphor-react'
import insideimg from '../../public/images/insideimg.svg'
import Image from 'next/image'
const values = [
  {
    icon: <ArrowsOutCardinal size={16} className="text-[#6115E7]" />,
    title: 'Flexibility',
    description:
      'We believe in providing adaptable workspaces that meet the diverse needs of modern professionals and teams.',
  },
  {
    icon: <UsersThree size={16} className="text-[#6115E7]" />,
    title: 'Community',
    description:
      'Building a supportive and vibrant community where members can connect, collaborate, and grow together.',
  },
  {
    icon: <Star size={16} className="text-[#6115E7]" />,
    title: 'Quality',
    description:
      'Offering top-notch amenities and a comfortable, professional atmosphere to enhance the work experience.',
  },
  {
    icon: <Lightbulb size={16} className="text-[#6115E7]" />,
    title: 'Innovation',
    description:
      'Continuously evolving our services and spaces to meet the changing demands of the workforce.',
  },
]

const OurValues: React.FC = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-4">Our Values</h2>
        <p className="text-center text-gray-600 mb-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="text-center flex flex-col justify-start items-start border border-gray-200 p-4 rounded-lg"
            >
              <div className="mb-4 p-2 bg-[#6115E71A] ">{value.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600 text-start text-xs">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto    bg-[#FAFAFC] shadow-md rounded-lg p-2 lg:p-8 lg:pr-0 lg:pb-0 flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-4 lg:px-16">
          <h2 className="text-2xl font-bold mb-4 text-black">
            Some Insights that drives us
          </h2>
          <p className="text-gray-600 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt
          </p>
          <div className="flex space-x-8 pt-8">
            <div className="flex  flex-col items-center">
              <div className="bg-purple-100 p-3 rounded-full mb-2">
                <ChartLineUp size={32} className="text-[#6115E7]" />
              </div>
              <h3 className="text-lg font-semibold text-center">7.4%</h3>
              <p className="text-gray-500 text-center text-sm">
                Increase in Productivity
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-3 rounded-full mb-2">
                <CalendarCheck size={32} className="text-[#6115E7]" />
              </div>
              <h3 className="text-lg font-semibold text-center">432</h3>
              <p className="text-gray-500 text-sm text-center">
                Spaces booked till now
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-3 rounded-full mb-2">
                <UsersThree size={32} className="text-[#6115E7]" />
              </div>
              <h3 className="text-lg font-semibold text-center">298</h3>
              <p className="text-gray-500 text-sm text-center">
                Satisfied Customers
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 h-[380px] overflow-hidden flex justify-center items-center">
          {/* Replace this with your SVG or image */}
          <Image alt="insideimg" src={insideimg} />
        </div>
      </div>
    </div>
  )
}

export default OurValues
