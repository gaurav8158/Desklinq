import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
type LikeSaveBtnsProps = {
  onWishlistClick?: () => Promise<void>
  saved?: boolean
}

const LikeSaveBtns: React.FC<LikeSaveBtnsProps> = ({
  onWishlistClick,
  saved = false,
}) => {
  const [isSaved, setIsSaved] = useState(saved)

  const handleClick = () => {
    setIsSaved(!isSaved)
    onWishlistClick && onWishlistClick()
  }
  const pathname = usePathname()

  const handleShareClick = async () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Desklinq',
          text: '',
          url: pathname,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error))
    }
  }
  return (
    <div className="flow-root">
      <div className="flex text-neutral-700 dark:text-neutral-300 text-sm -mx-3 -my-1.5">
        <span
          className="py-1.5 px-3 flex rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
          onClick={handleShareClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          <span className="hidden sm:block ml-2.5">Share</span>
        </span>
        <span
          className="group py-1.5 px-3 flex rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
          onClick={handleClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`transition duration-500 ease-in-out h-5 w-5 ${
              isSaved
                ? 'text-red-500'
                : 'text-neutral-700 dark:text-neutral-300 group-hover:text-red-500'
            }`}
            fill={isSaved ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span className="hidden sm:block ml-2.5">Save</span>
        </span>
      </div>
    </div>
  )
}

export default LikeSaveBtns
