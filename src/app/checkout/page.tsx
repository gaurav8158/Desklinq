'use client'
import React from 'react'
import CheckOutPagePageMain from './PageMain'
import withAuthRedirect from '../(HOC)/withAuthRedirect'

const page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) => {
  const { bookingId } = searchParams
  return <CheckOutPagePageMain bookingId={bookingId} />
}

export default withAuthRedirect(page)
