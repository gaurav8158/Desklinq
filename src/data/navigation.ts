import { MegamenuItem, NavItemType } from '@/shared/Navigation/NavigationItem'
import ncNanoId from '@/utils/ncNanoId'
import { Route } from '@/routers/types'
import __megamenu from './jsons/__megamenu.json'

// const megaMenuDemo: MegamenuItem[] = [
//   {
//     id: ncNanoId(),
//     image:
//       "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//     title: "Company",
//     items: __megamenu.map((i) => ({
//       id: ncNanoId(),
//       href: "/",
//       name: i.Company,
//     })),
//   },
//   {
//     id: ncNanoId(),
//     image:
//       "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//     title: "App Name",
//     items: __megamenu.map((i) => ({
//       id: ncNanoId(),
//       href: "/",
//       name: i.AppName,
//     })),
//   },
//   {
//     id: ncNanoId(),
//     image:
//       "https://images.pexels.com/photos/5059013/pexels-photo-5059013.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//     title: "City",
//     items: __megamenu.map((i) => ({
//       id: ncNanoId(),
//       href: "/",
//       name: i.City,
//     })),
//   },
//   {
//     id: ncNanoId(),
//     image:
//       "https://images.pexels.com/photos/5159141/pexels-photo-5159141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//     title: "Contruction",
//     items: __megamenu.map((i) => ({
//       id: ncNanoId(),
//       href: "/",
//       name: i.Contruction,
//     })),
//   },
//   {
//     id: ncNanoId(),
//     image:
//       "https://images.pexels.com/photos/7473041/pexels-photo-7473041.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//     title: "Country",
//     items: __megamenu.map((i) => ({
//       id: ncNanoId(),
//       href: "/",
//       name: i.Country,
//     })),
//   },
// ];

const demoChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: '/' as Route,
    name: 'Online booking',
  },
]

const otherPageChildMenus: NavItemType[] = [
  { id: ncNanoId(), href: '/about' as Route, name: 'About' },
  { id: ncNanoId(), href: '/contact' as Route, name: 'Contact us' },
  { id: ncNanoId(), href: '/auth/login' as Route, name: 'Login' },
  { id: ncNanoId(), href: '/auth/signup' as Route, name: 'Signup' },
]

const templatesChildrenMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: '/add-listing/1' as Route,
    name: 'Add listing',
    type: 'dropdown',
    children: [
      {
        id: ncNanoId(),
        href: '/add-listing/1' as Route,
        name: 'Add listing 1',
      },
      {
        id: ncNanoId(),
        href: '/add-listing/2' as Route,
        name: 'Add listing 2',
      },
      {
        id: ncNanoId(),
        href: '/add-listing/3' as Route,
        name: 'Add listing 3',
      },
      {
        id: ncNanoId(),
        href: '/add-listing/4' as Route,
        name: 'Add listing 4',
      },
      {
        id: ncNanoId(),
        href: '/add-listing/5' as Route,
        name: 'Add listing 5',
      },
      {
        id: ncNanoId(),
        href: '/add-listing/6' as Route,
        name: 'Add listing 6',
      },
      {
        id: ncNanoId(),
        href: '/add-listing/7' as Route,
        name: 'Add listing 7',
      },
      {
        id: ncNanoId(),
        href: '/add-listing/8' as Route,
        name: 'Add listing 8',
      },
      {
        id: ncNanoId(),
        href: '/add-listing/9' as Route,
        name: 'Add listing 9',
      },
      {
        id: ncNanoId(),
        href: '/add-listing/10' as Route,
        name: 'Add listing 10',
      },
    ],
  },
  //
  { id: ncNanoId(), href: '/checkout' as Route, name: 'Checkout' },
  { id: ncNanoId(), href: '/pay-done' as Route, name: 'Pay done' },
  //
  { id: ncNanoId(), href: '/mybookings' as Route, name: 'My booking' },
  { id: ncNanoId(), href: '/account' as Route, name: 'Account page' },
]

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: '/' as Route,
    name: 'Home',
    type: 'dropdown',
    children: demoChildMenus,
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: '/listing-stay' as Route,
    name: 'Listing Page',
    type: 'dropdown',
    children: [
      {
        id: ncNanoId(),
        href: '/listing-stay' as Route,
        name: 'Stay listings',
        type: 'dropdown',
        children: [
          { id: ncNanoId(), href: '/listing-stay' as Route, name: 'Stay page' },
          {
            id: ncNanoId(),
            href: '/listing-stay-map' as Route,
            name: 'Stay page (map)',
          },
          {
            id: ncNanoId(),
            href: '/listing-car-detail' as Route,
            name: 'Stay Detail',
          },
        ],
      },
    ],
  },
  {
    id: ncNanoId(),
    href: '/mybookings' as Route,
    name: 'My Bookings',
    type: 'dropdown',
    children: templatesChildrenMenus,
  },

  {
    id: ncNanoId(),
    href: '/auth/login' as Route,
    name: 'Other pages',
    type: 'dropdown',
    children: otherPageChildMenus,
  },
]

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: ncNanoId(),
    href: '/' as Route,
    name: 'Home',
    type: 'dropdown',
    children: demoChildMenus,
    isNew: true,
  },

  //
  {
    id: ncNanoId(),
    href: '/listing-stay' as Route,
    name: 'Listing pages',
    children: [
      { id: ncNanoId(), href: '/listing-stay' as Route, name: 'Stay listings' },
      {
        id: ncNanoId(),
        href: '/listing-stay-map' as Route,
        name: 'Stay listings (map)',
      },
      {
        id: ncNanoId(),
        href: '/listing-car-detail' as Route,
        name: 'Stay detail',
      },

      //
    ],
  },

  //
  {
    id: ncNanoId(),
    href: '/mybookings' as Route,
    name: 'My Bookings',
    type: 'dropdown',
    children: templatesChildrenMenus,
  },

  //
  {
    id: ncNanoId(),
    href: '/blog' as Route,
    name: 'Other pages',
    type: 'dropdown',
    children: otherPageChildMenus,
  },
]
