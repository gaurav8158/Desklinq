import React, { FC } from 'react'
import rightImgPng from '@/images/benefit-img.jpg'
import Image, { StaticImageData } from 'next/image'
import Badge from '@/shared/Badge'
import WCHIMG from '../../public/images/WCHIMG.png'
import SignalWifi1BarOutlinedIcon from '@mui/icons-material/SignalWifi1BarOutlined'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined'
export interface SectionOurFeaturesProps {
  className?: string
  rightImg?: StaticImageData
  type?: 'type1' | 'type2'
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
  className = 'lg:py-14',
  rightImg = rightImgPng,
  type = 'type1',
}) => {
  return (
    // <div
    //   className={`nc-SectionOurFeatures relative flex flex-col items-center ${
    //     type === 'type1' ? 'lg:flex-row' : 'lg:flex-row-reverse'
    //   } ${className}`}
    //   data-nc-id="SectionOurFeatures"
    // >
    //   <div className="flex-grow  flex justify-center items-center">
    //     <Image src={rightImg} alt="" width={500} />
    //   </div>
    //   <div
    //     className={`max-w-3xl flex-shrink-0 mt-10 lg:mt-0 lg:w-5/12 ${
    //       type === 'type1' ? 'lg:pr-2' : 'lg:pr-16'
    //     }`}
    //   >
    //     <span className="uppercase text-sm text-gray-400 tracking-widest">
    //       BENEFITS
    //     </span>
    //     <h2 className="font-semibold text-4xl mt-5">
    //       Experience the Desklinq Advantages
    //     </h2>

    //     <ul className="space-y-10 mt-14">
    //       <li className="space-y-4">
    //         <Badge name="Effortless" />
    //         <span className="block text-xl font-semibold">
    //           Unlock Seamless Convenience
    //         </span>
    //         <span className="block mt-5 text-sm text-neutral-500 dark:text-neutral-400">
    //           Explore, Reserve, and Collaborate Instantly with Day Desks,
    //           Meeting Rooms & Virtual offices. Our platform simplifies your
    //           search with various filters such as distance, price, facilities,
    //           and more. Say goodbye to the hassle of searching workspaces
    //           manually– find what suits you best Online.
    //         </span>
    //       </li>
    //       <li className="space-y-4">
    //         <Badge color="green" name="Rewarding" />
    //         <span className="block text-xl font-semibold">
    //           Enjoy Ultimate Flexibility
    //         </span>
    //         <span className="block mt-5 text-sm text-neutral-500 dark:text-neutral-400">
    //           With DeskLinq&apos;s Payment Options – Pay Online or On-Site,
    //           It&apos;s Your Choice! Elevate your experience by collecting
    //           points with every booking on DeskLinq. Redeem your points for
    //           exclusive rewards, including free access to premium workspaces.
    //           Your workspace, your way, with added perks!
    //         </span>
    //       </li>
    //       <li className="space-y-4">
    //         <Badge color="red" name="Diverse" />
    //         <span className="block text-xl font-semibold">
    //           Venture Beyond Work
    //         </span>
    //         <span className="block mt-5 text-sm text-neutral-500 dark:text-neutral-400">
    //           Dive into Exclusive Collaborative Havens such as Jamrooms,
    //           Fashionworkspaces, Podcast & Reel Studios! Explore a diverse range
    //           of creative environments tailored to meet unique professional and
    //           personal needs.
    //         </span>
    //       </li>
    //     </ul>
    //   </div>
    // </div>

    <div className=" grid md:grid-cols-2 gap-16 container mx-auto px-4 py-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">Why Choose Desklinq?</h2>
        <p className="text-gray-600 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </p>
        <div className="w-full sm:h-[330px] rounded-md overflow-hidden">
          <Image
            src={WCHIMG}
            alt="Office Environment"
            className="object-cover"
          />
        </div>
      </div>
      <div className=" items-start">
        <div>
          <div className="mb-6">
            <div className="text-[#6115E7] mb-2">
              {/* Replace with actual icon */}

              <SignalWifi1BarOutlinedIcon />
            </div>
            <div className="flex items-center mb-2">
              <h3 className="text-xl font-semibold">Free WiFi and coffee</h3>
            </div>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>
          <div className="w-full bg-gray-200 h-[1px] mt-6 mb-8" />
          <div className="mb-6">
            <div className="text-[#6115E7] mb-2">
              {/* Replace with actual icon */}

              <TimerOutlinedIcon />
            </div>
            <div className="flex items-center mb-2">
              <h3 className="text-xl font-semibold">
                Flexible booking and payment
              </h3>
            </div>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>
          <div className="w-full bg-gray-200 h-[1px] mt-6 mb-8" />
          <div>
            <div className="text-[#6115E7] mr-2 mb-2">
              {/* Replace with actual icon */}
              <SpaOutlinedIcon />{' '}
            </div>
            <div className="flex items-center mb-2">
              <h3 className="text-xl font-semibold">
                Inspiring and collaborative environment
              </h3>
            </div>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionOurFeatures
