interface Coordinates {
  type: 'Point'
  coordinates: [number, number]
}

export interface Address {
  houseNumber?: string
  country: string
  area: string
  pin: number
  city: string
  state: string
  location: Coordinates
  description: string
  detailedAddress: string
}

export interface Amenity {
  name: string
  image: string
  info: string
  category: string
  id: string
}

export interface OpeningHours {
  day: string
  openTime: string
  closeTime: string
  _id: string
}

interface AdditionalInfoSection {
  title: string
  data: string[]
}

export interface AdditionalInfo {
  rules: AdditionalInfoSection
  cancellationPolicy: AdditionalInfoSection
  specialNote: AdditionalInfoSection
  title: string
}

export interface Property {
  name: string
  address: Address
  description: string
  amenities: Amenity[]
  rating: number
  images: string[]
  offerings: any[] // Adjust as per the actual type of offerings
  vendor: string
  status: string
  openingHours: OpeningHours[] | null
  createdAt: string
  id: string
}

export interface Pricing {
  context: string
  duration: string
  area: string
  currency: string
  price: number
  info: string
}

export interface Offering {
  additionalInfo: AdditionalInfo
  property: Property
  address: Address
  status: string
  vendor: string
  type: string
  name: string
  capacity: number
  capacityUnit: string
  images: string[]
  amenities: Amenity[]
  pricing: Pricing[]
  rating: number
  description: string
  createdAt: string
  id: string
}
