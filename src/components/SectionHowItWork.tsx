import React, { FC } from 'react'
import HIW1img from '../../public/images/howwork1.png'
import HIW2img from '../../public/images/howwork2.png'
import HIW3img from '../../public/images/howwork3.png'
import step21 from '../../public/images/HWI21.png'
import step22 from '../../public/images/HWI22.png'
import TableRestaurantOutlinedIcon from '@mui/icons-material/TableRestaurantOutlined'
import step3 from '../../public/images/HWI3.png'
import VectorImg from '@/images/VectorHIW.svg'
import Image, { StaticImageData } from 'next/image'
import Heading from '@/shared/Heading'
import SearchIcon from '@mui/icons-material/Search'
import PinDropIcon from '@mui/icons-material/PinDrop'
import TollOutlinedIcon from '@mui/icons-material/TollOutlined'
export interface SectionHowItWorkProps {
  className?: string
  data?: {
    id: number
    title: string
    desc: string
    img: StaticImageData
    imgDark?: StaticImageData
  }[]
}

const DEMO_DATA: SectionHowItWorkProps['data'] = [
  {
    id: 1,
    img: HIW1img,
    title: 'Choose',
    desc: "Select your desired workplace, whether it's a meeting room, Hot desk, or virtual office.",
  },
  {
    id: 2,
    img: HIW2img,
    title: 'Reserve',
    desc: 'Reserve your chosen workplace by providing the required details and preferred date/time.',
  },
  {
    id: 3,
    img: HIW3img,
    title: 'Verify',
    desc: 'Confirm your booking by reviewing the reservation details and making the necessary payment, if applicable.',
  },
]

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
  className = '',
  data = DEMO_DATA,
}) => {
  return (

      <div
        className={`nc-SectionHowItWork  ${className} bg-[#FAFAFC]  px-2 py-40`}
        data-nc-id="SectionHowItWork"
      >
        <Heading isCenter>How it works ?</Heading>
        <div className="mt-20  grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white m-auto md:w-[220px] lg:w-[300px] xl:w-[400px] max-w-[400px] h-[430px] overflow-hidden rounded-lg shadow-lg pl-6 pt-6">
            <div className="text-[#6115E7] flex items-center mb-2">
              <PinDropIcon className="text-[#6115E7] mr-2" />
              STEP 1
            </div>
            <h2 className="text-xl font-bold mb-4">Choose your Location</h2>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </p>
            <div className="-mr-10 ml-10 mt-24">
              <div className="mb-4  flex items-center border rounded-2xl px-2">
                <SearchIcon className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Bangalore"
                  className="w-full outline-none  focus:ring-0 focus:border-transparent border-none"
                />
              </div>
              <div className="border-t-2 border-l-2 pl-3 pt-3 rounded-tl-xl">
                <div className="flex space-x-2">
                  <button className="bg-[#6115E7] text-white px-6 py-[2px] rounded-full">
                    All
                  </button>
                  <button className="border px-4 py-[3px] rounded-full">
                    Desks
                  </button>
                  <button className="border px-4 py-[3px] rounded-full">
                    Spaces
                  </button>
                  <button className="border px-4 py-[3px] rounded-full">
                    Meeting
                  </button>
                </div>
                <div className="mt-3 flex flex-row gap-4">
                  <div className="bg-[#6115E70F] h-20 w-40 rounded-t-xl" />
                  <div className="bg-[#6115E70F] h-20 w-40 rounded-t-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white m-auto md:w-[220px] lg:w-[300px] xl:w-[400px] max-w-[400px] h-[430px] overflow-hidden rounded-lg shadow-lg pt-6 pl-6">
            <div className="text-[#6115E7] flex items-center mb-2">
              <TableRestaurantOutlinedIcon className="text-[#6115E7] mr-2" />
              STEP 2
            </div>
            <h2 className="text-xl font-bold mb-4">Choose your space</h2>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </p>
            <div className="pt-4 rounded-lg flex">
              <Image
                alt=""
                className="w-[240px] -ml-5 mt-[5px] h-[245px] rounded-xl"
                src={step21}
              />
              <Image
                alt=""
                className="w-[240px] h-[250px] -mt-10 -ml-20 rounded-xl"
                src={step22}
              />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white m-auto md:w-[220px] lg:w-[300px] xl:w-[400px]  max-w-[400px] h-[430px] overflow-hidden rounded-lg shadow-lg pl-6 pt-6">
            <div className="text-[#6115E7] flex items-center mb-2">
              <TollOutlinedIcon className="text-[#6115E7] mr-2" />
              STEP 3
            </div>
            <h2 className="text-xl font-bold mb-4">Pay Online or On-site</h2>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </p>
            <div className="w-full flex mt-20 justify-center items-center">
              <Image
                alt=""
                className="w-[270px] h-[190px]  rounded-xl"
                src={step3}
              />
            </div>
          </div>
        </div>
      </div>
   
  )

  return (
    <div
      className={`nc-SectionHowItWork  ${className}`}
      data-nc-id="SectionHowItWork"
    >
      <Heading isCenter>How it works ?</Heading>
      <div className="mt-20 relative grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* <Image
          className="hidden md:block absolute inset-x-0 top-10"
          src={VectorImg}
          alt=""
        /> */}
        {data.map(
          (item) =>
            item.imgDark ? (
              <>
                <Image
                  className="mb-8 md:max-w-[240px] lg:max-w-[340px] hover:shadow-md cursor-pointer rounded-xl mx-auto"
                  src={item.img}
                  alt=""
                />
                <Image
                  alt=""
                  className="mb-8 md:max-w-[240px] lg:max-w-[340px] hover:shadow-md cursor-pointer rounded-xl mx-auto"
                  src={item.imgDark}
                />
              </>
            ) : (
              <Image
                alt=""
                className="mb-8 w-full md:max-w-[240px] lg:max-w-[340px] hover:shadow-md cursor-pointer rounded-xl mx-auto"
                src={item.img}
              />
            )
          // <div
          //   key={item.id}
          //   className="relative flex justify-center flex-col items-center max-w-xs mx-auto"
          // >
          //   {item.imgDark ? (
          //     <>
          //       <Image
          //         className="dark:hidden block mb-8 max-w-[280px] mx-auto"
          //         src={item.img}
          //         alt=""
          //       />
          //       <Image
          //         alt=""
          //         className="hidden dark:block mb-8 max-w-[280px] mx-auto"
          //         src={item.imgDark}
          //       />
          //     </>
          //   ) : (
          //     <Image
          //       alt=""
          //       className="mb-8 max-w-[380px] mx-auto"
          //       src={item.img}
          //     />
          //   )}
          //   {/* <div className="text-center mt-auto">
          //     <h3 className="text-xl font-semibold">{item.title}</h3>
          //     <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
          //       {item.desc}
          //     </span>
          //   </div> */}
          // </div>
        )}
      </div>
    </div>
  )
}

export default SectionHowItWork
