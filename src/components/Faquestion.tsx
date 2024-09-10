import React, { useState } from 'react'
const faqData = [
    {
      title: 'What is DeskLinq?',
      content:
        'DeskLinq is an innovative platform that offers instant access to meeting rooms and day desks for individuals and businesses. The DeskLinq platform simplifies the process of finding and booking workspace, providing users with a hassle-free solution for their workspace needs.',
    },
    {
      title: 'How does DeskLinq work?',
      content:
        'DeskLinq allows users to search for available meeting rooms and day desks in their preferred location. Once they find a space that meets their needs, they can book it instantly and in real-time. Users can specify the dates and times they require the space, making it easy to find workspace on-demand.',
    },
    {
      title: 'What are the benefits of using DeskLinq?',
      content:
        "1. Instant Access: Users can book workspace in real-time, eliminating the need for advance notice.\n2. Flexibility: DeskLinq offers flexible options, allowing users to book meeting rooms and day desks for any duration they need.\n3. Transparent Pricing: DeskLinq provides upfront pricing for all its services, ensuring that users know exactly what they're paying for.\n4. User-Friendly Interface: DeskLinq's platform is designed to be intuitive and easy to use, making it simple for users to find and book workspace.\n5. Dedicated Customer Support: DeskLinq offers dedicated customer support to assist users with any questions or concerns they may have.\n6. Earn points as you book more and redeem them for free passes to a wide network of workspaces",
    },
    {
      title: 'Is there a membership fee to use DeskLinq?',
      content:
        'DeskLinq does not require a membership fee to use its platform. Users only pay for the spaces they book, with transparent pricing provided upfront.',
    },
    {
      title: 'Can I cancel or modify my booking on DeskLinq?',
      content:
        "Users can cancel or modify their booking on DeskLinq, subject to the cancellation policy of the space they've booked. Details regarding cancellation and modification policies are provided at the time of booking.",
    },
    {
      title: 'What types of spaces are available on DeskLinq?',
      content:
        'DeskLinq offers a wide range of spaces, including meeting rooms, conference rooms, private offices, and day desks. Whether you need a space for a client meeting, a team brainstorming session, or a day of focused work, DeskLinq has you covered. If you have a larger requirement, mail us and our AI-enabled search will assist you.',
    },
    {
      title: 'Is DeskLinq available in my area?',
      content:
        'DeskLinq is continuously expanding its network of available spaces. Currently, DeskLinq operates in Bangalore, Delhi & NCR, with plans for further expansion in the future.',
    },
    {
      title: 'How much does it cost to use DeskLinq?',
      content:
        'DeskLinq offers transparent pricing for all its services. Prices may vary depending on the location, type of space, and duration of booking. Users can view pricing details for each available space directly on the platform before booking.',
    },
    {
      title: 'Can I cancel or modify my booking?',
      content:
        'Yes, users can cancel or modify their bookings through the DeskLinq platform. However, cancellation and modification policies may vary depending on the specific space and provider. Users should review the cancellation and modification policies for each booking before making a reservation.',
    },
    {
      title: 'Is my payment information secure on DeskLinq?',
      content:
        'DeskLinq takes the security of user information seriously. All payments made through the platform are processed securely using industry-standard encryption protocols. Users can book with confidence knowing that their payment information is safe and secure.',
    },
    {
      title: 'How can I contact DeskLinq for support?',
      content:
        "Users can contact DeskLinq's customer support team for assistance with any questions or concerns they may have. Support inquiries can be submitted through the platform's contact form or by emailing connect@desklinq.com. Our team is dedicated to providing prompt and helpful assistance to ensure a seamless booking experience for all users.",
    },
    {
      title: 'How can I list my space on DeskLinq?',
      content:
        "Space providers interested in listing their spaces on DeskLinq can submit a listing request through the platform's website. Our team will review the request and reach out to discuss the onboarding process and requirements for listing spaces on DeskLinq.",
    },
  ]
  const AccordionItem = ({ header, text }: any) => {
    const [active, setActive] = useState(false)
  
    const handleToggle = (event: React.MouseEvent) => {
      event.preventDefault()
      setActive(!active)
    }
    return (
      <div className="mb-0 w-full p-4 sm:p-2 lg:px-6 xl:px-8">
        <button className="faq-btn flex w-full text-left" onClick={handleToggle}>
          <div className="w-full">
            <h4 className="mt-1 text-lg font-semibold text-dark dark:text-white">
              {header}
            </h4>
          </div>
          <div className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary/5 text-primary dark:bg-white/5">
            <svg
              className={`fill-primary stroke-primary duration-200 ease-in-out transform ${
                active ? 'rotate-45' : ''
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
        </button>
  
        <div
          className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
            active ? 'max-h-40' : 'max-h-0'
          }`}
        >
          <p className="py-3 text-base leading-relaxed text-gray-600 dark:text-dark-6">
            {text}
          </p>
        </div>
        <div className="border-b-[2px] border-gray-200 mr-8 pt-4" />
      </div>
    )
  }
const Faquestion = () => {
    const [more, setMore] = useState(false)
    const handleMore = () => {
      setMore(!more)
    }
  return (
    <div className="-mx-4 flex flex-wrap">
      <div className="w-full px-4 lg:w-full">
        {faqData.slice(0, more ? faqData.length : 4).map((faq, index) => (
          <AccordionItem key={index} header={faq.title} text={faq.content} />
        ))}
      </div>
      <div
        className="flex cursor-pointer gap-2 ml-12 mt-4 items-center"
        onClick={handleMore}
      >
        Load more
        <svg
          className={`fill-primary stroke-primary duration-200 ease-in-out transform ${
            more ? 'rotate-45' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
    </div>
  )
}
export default Faquestion

