import Logo from '@/shared/Logo'
import React from 'react'

export default function DashboardFooter() {
  return (
    <div>
      <footer className="block pt-8">
        <div className="container mx-auto px-4">
          <hr className="border-b-1 border-blueGray-200" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="px-4">
              {/* <div className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
                                Copyright © 2023
                            </div> */}
              <Logo />
            </div>

            <div className="px-4">
              {/* <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                                <li>
                                    <a
                                        className="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"
                                    >
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"
                                    >
                                        Xyz
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"
                                    >
                                        Xyz
                                    </a>
                                </li>
                            </ul> */}
              <div className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
                Copyright © 2023
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
