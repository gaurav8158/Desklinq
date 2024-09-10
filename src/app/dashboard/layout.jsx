'use client'

import React from 'react'
import '@/styles/tailwind.css'
import Sidebar from './components/Sidebar.jsx'
import withAuthRedirect from '@/app/(HOC)/withAuthRedirect'
import { ToastContainer } from 'react-toastify'
import { TourProvider } from '@reactour/tour'
import tourStyles from '@/config/tourGuide/tourStyles'

const PageDashboard = ({ children }) => {
  return (
    <TourProvider
      styles={tourStyles}
      showBadge={false}
      scrollSmooth
      showCloseButton={false}
    >
      <div className="h-[100vh]">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          limit={1}
        />
        <Sidebar />
        <div
          className="relative lg:ml-64 2xl:ml-96"
          style={{ backgroundColor: 'rgb(241 245 249 / 1' }}
        >
          <div className="p-4 mx-auto w-full">{children}</div>
        </div>
      </div>
    </TourProvider>
  )
}

export default withAuthRedirect(PageDashboard)
