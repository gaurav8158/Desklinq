/* eslint-disable react/no-unescaped-entities */
'use client'

import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

import React from 'react'

const data = [
  {
    question: 'Do you offer technical support?',
    answer: 'No.',
  },
  {
    question: 'Do you offer technical support?',
    answer: 'No.',
  },
  {
    question: 'Do you offer technical support?',
    answer: 'No.',
  },
  {
    question: 'Do you offer technical support?',
    answer: 'No.',
  },
]

const FAQs = () => {
  return (
    <div className="w-full px-4 pt-16">
      <div className="w-full p-2 mx-auto bg-white max-w-5xl rounded-2xl">
        <h1 className="text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 pb-5">
          FAQs
        </h1>
        {data.map((faq, index) => (
          <Disclosure as="div" key={index} className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-6 py-3 text-xl font-medium font-sans text-left rounded-lg text-neutral-900 bg-neutral-100 hover:bg-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500/75">
                  <span>{faq.question}</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-neutral-500`}
                  />
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-lg text-gray-500">
                    {faq.answer}
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  )
}

export default FAQs
