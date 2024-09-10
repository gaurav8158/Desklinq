import React, { FC, useContext } from 'react'
import { PathName } from '@/routers/types'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks'
import { fetchListing } from '@/redux/listing/listingSlice'
import { SearchContext } from '@/app/layout'
import { useRouter } from 'next/navigation'

interface Props {
  className?: string
  href: PathName
}

const ButtonSubmit: FC<Props> = ({ className = '' }) => {
  const primaryFilter = useAppSelector(
    (state: any) => state.filter.primaryFilter
  )
  const href = primaryFilter.space.toLowerCase().replace(' ', '-')

  const SearchDispatch = useAppDispatch()
  const { dispatch } = useContext(SearchContext)!
  const handelClick = () => {
    SearchDispatch(fetchListing())
    dispatch({ type: 'search' })
  }
  return (
    <Link
      href={`/${href}`}
      type="button"
      className={`h-12 px-4 rounded-lg bg-[#6115E7] hover:bg-primary-700 flex items-center justify-center text-neutral-50 focus:outline-none ${className}`}
      onClick={() => {
        handelClick() // Assuming it's a valid function
        const element = document.querySelector(
          '.nc-Footer'
        ) as HTMLElement | null
        if (element) {
          element.click()
        }
      }}
    >
      <span className="mr-3">Search</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </Link>
  )
}

export default ButtonSubmit
