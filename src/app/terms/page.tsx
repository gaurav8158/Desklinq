import BgGlassmorphism from '@/components/BgGlassmorphism'
import { termsOfUse } from '@/data/termsOfUse'
import React from 'react'

const page = () => {
  return (
    <div>
      <BgGlassmorphism />
      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <div className={` relative`}>
          <div className="flex">
            <div className="w-screen space-y-5 lg:space-y-7 lg:space-x-10">
              <h4 className="text-3xl !leading-tight font-semibold text-neutral-900 md:text-4xl xl:text-5xl dark:text-neutral-100">
                Terms of Use
              </h4>
              {termsOfUse.map((item) => (
                <>
                  {item?.title && (
                    <h4 className="text-lg !leading-tight font-semibold text-neutral-900 md:text-xl xl:text-2xl dark:text-neutral-100">
                      {item?.title}
                    </h4>
                  )}
                  <span className="block text-base xl:text-lg text-neutral-6000 dark:text-neutral-400">
                    {item.content?.map((item, index) => (
                      <p className="py-1" key={index}>
                        {item}
                      </p>
                    ))}
                  </span>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
