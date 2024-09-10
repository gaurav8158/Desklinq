export interface LocationType {
  type: string
  coordinates: [number, number] // [lng, lat]
  _id: string
}

export interface AddressType {
  country: string
  area: string
  landmark: string
  houseNumber: string
  pin: number
  city: string
  state: string
  location: LocationType
  description: string
}

export interface AmenityType {
  _id: string
  Name: string
  Image: string
  info: string
  category: string
  __v: number
}

export interface ImageType {
  uri: string
  order: number
  description: string
  _id: string
}

export interface PricingType {
  context: string
  duration: 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'
  area: string
  currency: string
  price: number
  info: string
}

export interface OfferingType {
  type: string
  name: string
  capacity: number
  amenities: AmenityType[]
  pricing: PricingType[]
  id: string
}

export interface PropertiesDataType {
  name: string
  address: AddressType
  description: string
  amenities: string[]
  rating: number
  images: ImageType[] | string[]
  offerings: string[]
  status: string
  vendor: string
  _id: string

  location: LocationType
  openingHours?: OpeningHoursType[]
}
export interface OpeningHoursType {
 
  openTime: string // Example: '08:00 AM'
  closeTime: string // Example: '05:00 PM'
}

export interface offeringsListingType {
  _id: string
  type: string
  name: string
  property: PropertiesDataType
  address: AddressType
  capacity: number
  amenities: AmenityType[]
  pricing: PricingType[]
  images: ImageType[]
  status: string
  distance: number
  vendor: string
  rating: number
  description: string
  AvailabilityStatus?: string
  slug: string
}
