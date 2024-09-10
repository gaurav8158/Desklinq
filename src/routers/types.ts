import ButtonSubmit from '@/app/(client-components)/(HeroSearchForm)/ButtonSubmit'
import type { Route as NextRoute } from 'next'
import { ComponentType } from 'react'

// Get ready to update to nextjs version 13.2 with X typedRoutes
export type Route<T = string> = NextRoute
export type PathName = Route

export interface Page {
  path: PathName
  exact?: boolean
  component: ComponentType<Object>
}

// Example usage
const page: Page = {
  path: '/listing-stay', // Make sure this value matches the type 'PathName'
  exact: true,
  component: ButtonSubmit,
}
