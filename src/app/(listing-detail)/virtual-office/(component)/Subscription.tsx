import { CheckIcon } from '@heroicons/react/24/solid'
import React, { FC } from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'

export interface PageSubcriptionProps {}

export interface PricingItem {
  isPopular: boolean
  name: string
  pricing: string
  desc: string
  per: string
  features: string[]
}

const pricings: PricingItem[] = [
  {
    isPopular: false,
    name: 'BASIC PLAN',
    pricing: '₹ 18,499',
    per: '/yr',
    features: [
      'Documentation required by the government for new business establishment and GST registration',
      'Handling of mail and packages',
      'Address Change and Additional Address',
      'Company Name-board display and Mailbox service',
    ],
    desc: `Establish your business with a premium address in under 15 minutes and get government-compliant documentation for company registration.`,
  },
  {
    isPopular: true,
    name: 'PREMIUM PLAN',
    pricing: '₹28,499',
    per: '/mo',
    features: [
      'Government-compliant documentation for new business and GST registration',
      'Mail and package handling',
      'Day pass and conference rooms at special offers*',
      'Exclusive invite to WeWork events',
      'Host events in WeWork locations*',
      'Explore our plan starting at',
    ],
    desc: `Scale your business with a premium address in under 15 minutes and get government compliant documents for GST registration.`,
  },
  {
    isPopular: false,
    name: 'Business Address Plan',
    pricing: '₹ 1199',
    per: '/mo',
    features: [
      'Government-compliant documentation for GST registration',
      'Mail and package handling',
      'Day pass and conference rooms at special offers*',
      'Exclusive invite to WeWork events',
      'Host events in WeWork locations*',
      'Explore our plan starting at',
    ],
    desc: `Get a premium address in under 15 minutes, with mail and package handling services and other benefits.`,
  },
]

const Subscription: FC<PageSubcriptionProps> = () => {
  const renderPricingItem = (pricing: PricingItem, index: number) => {
    return (
      <div
        key={index}
        className={`h-full relative px-6 py-8 rounded-3xl border-2 flex flex-col overflow-hidden ${
          pricing.isPopular
            ? 'border-primary-500'
            : 'border-neutral-100 dark:border-neutral-700'
        }`}
      >
        {pricing.isPopular && (
          <span className="absolute z-10 px-3 py-1 text-xs tracking-widest text-white rounded-full bg-primary-500 right-3 top-3">
            POPULAR
          </span>
        )}
        <div className="mb-8">
          <h3 className="block mb-2 text-sm font-medium tracking-widest uppercase text-neutral-6000 dark:text-neutral-300">
            {pricing.name}
          </h3>
          <h2 className="flex items-center text-5xl leading-none text-neutral-900 dark:text-neutral-300">
            <span>{pricing.pricing}</span>
            <span className="ml-1 text-lg font-normal text-neutral-500">
              {pricing.per}
            </span>
          </h2>
        </div>
        <nav className="mb-8 space-y-4">
          {pricing.features.map((item, index) => (
            <li className="flex items-center" key={index}>
              <span className="inline-flex flex-shrink-0 mr-4 text-primary-6000">
                <CheckIcon className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="text-neutral-700 dark:text-neutral-300">
                {item}
              </span>
            </li>
          ))}
        </nav>
        <div className="flex flex-col mt-auto">
          {pricing.isPopular ? (
            <ButtonPrimary>Book now</ButtonPrimary>
          ) : (
            <ButtonSecondary>
              <span className="font-medium">Book now</span>
            </ButtonSecondary>
          )}
          <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
            {pricing.desc}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`nc-PageSubcription container pb-24 lg:pb-32 `}>
      <header className="max-w-2xl mx-auto my-20 text-center">
        <h2 className="flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Pick a plan that’s perfect for you
        </h2>
        <span className="block mt-2 text-sm text-neutral-700 sm:text-base dark:text-neutral-200">
          Explore our flexible plans that are designed for your business needs
        </span>
      </header>
      <section className="overflow-hidden text-sm text-neutral-600 md:text-base">
        <div className="grid gap-5 lg:grid-cols-3 xl:gap-8">
          {pricings.map(renderPricingItem)}
        </div>
      </section>
    </div>
  )
}

export default Subscription
