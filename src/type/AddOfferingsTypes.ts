type RulesType = {
  title?: string
  data?: string[]
}

type PricingType = {
  context: string
  duration: 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'
  area: string
  currency: string
  price: number
  info: string
}

export type AddOfferingTypes = {
  rules: any
  cancellationPolicy: any
  specialNotes: any // Corrected property name
  status: string | null
  vendor: any
  property: any
  type: string | null
  name: string | null
  description: string | null
  capacity: number | null
  capacityUnit: string | null
  amenities: string[] | null
  pricing: PricingType[] | null
  images: string[]
  address: any
  additionalInfo: any
}
