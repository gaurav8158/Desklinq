'use client'

import { usePathname } from 'next/navigation'
import { Poppins } from 'next/font/google'
import SiteHeader from './(client-components)/(Header)/SiteHeader'
import ClientCommons from './ClientCommons'
import Footer from '@/components/Footer'
import FooterNav from '@/components/FooterNav'
import './globals.css'
import '@/fonts/line-awesome-1.3.0/css/line-awesome.css'
import '@/styles/index.scss'
import 'rc-slider/assets/index.css'
import MainNav2 from './(client-components)/(Header)/MainNav2'
import { Provider } from 'react-redux'
import store from '@/redux/app/store'
import React, { useContext, useReducer } from 'react'
import Script from 'next/script'
import Image from 'next/image'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

type State = string | null

type Action = {
  type: string
}

const initialState = null

export const SearchContext = React.createContext<{
  state: string | null
  dispatch: React.Dispatch<any>
} | null>({
  state: initialState,
  dispatch: () => null,
})

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'show':
      return 'show'
    case 'hide':
      return null
    case 'search':
      return 'search'
    default:
      return null
  }
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: any
}) {
  const pathname = usePathname()
  const showComponent = pathname.startsWith('/dashboard')
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <html lang="en" className={poppins.className}>
      <head>
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=G-X0B35HZ634`}
        />
        <Script strategy="lazyOnload" id="inline-script">
          {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-X0B35HZ634', {
                    page_path: window.location.pathname,
                    });
                `}
        </Script>

        <Script strategy="lazyOnload" id="inline-script">
          {`  !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '470085005539314');
              fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <Image
            height={1}
            width={1}
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=470085005539314&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>Desklinq || Find your perfect workplace</title>
      </head>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <Provider store={store}>
          <SearchContext.Provider value={{ state, dispatch }}>
            {!showComponent && <ClientCommons />}
            {!showComponent && <SiteHeader />}
            {/* {!showComponent && <MainNav2 />} */}
            {children}
            {!showComponent && <FooterNav />}
            {!showComponent && <Footer />}
          </SearchContext.Provider>
        </Provider>
        <script
          async
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBB4ACnJ7RDVATSfznyI0Z5Lxn4Rjdmjvk&libraries=places`}
          type="text/javascript"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var script = document.createElement('script');
                script.src = 'bundle.js';
                document.body.appendChild(script);
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}
