interface Address {
  country: string
  area: string
  landmark: string
  houseNumber: string
  pin: number
  city: string
  state: string
  location: {
    type: string
    coordinates: [number, number]
    _id: string
  }
  description: string
}

interface Image {
  uri: string
  order: number
  description: string
  _id: string
}

interface Offering {
  type: string
  name: string
  capacity: number
  amenities: string[]
  pricing: {
    context: string
    duration: string
    area: string
    currency: string
    price: number
    info: string
  }[]
  description: string
  id: string
}

interface Discount {
  name: string
  value: number
  meta: {
    unit: 'PERCENT' | 'AMOUNT'
    value?: number // Optional for PERCENT unit
  }
  effectiveDiscountValue: number
}

interface Charge {
  name: string
  value: number
}

interface ApplicableCharge {
  chargeType: 'PLATFORM_FEE' | 'REFUND'
  chargeDisplayName: string
  chargeValue: number
  chargeReason?: string // Optional
  chargeOwner: string
}

export interface Payment {
  type: 'PARTIAL' | 'FULL' | 'ON_PREMISE'
  amount: number
}

export interface Price {
  mrp: number
  total: number
  subTotal: number
  discounts: Discount[]
  payments: Payment[]
  amountToBePaid: number
  charges: Charge[]
  applicableCharge: ApplicableCharge[]
}

export interface BookingType {
  paymentMode: 'FULL' | 'PARTIAL' | 'ON_PREMISE'
  payment: Price
  property: {
    name: string
    address: Address
    description: string
    amenities: string[]
    rating: number
    images: Image[]
    offerings: string[]
    vendor: string
    status: string
    id: string
  }
  customer: string
  offerings: Offering
  startTime: Date
  endTime: Date
  status: string
  price: number
  confirmationCode: string
  capacity: number
  statusHistory: {
    status: string
    timestamp: string
  }[]
  id: string
}

export type durationsOffer =
  | 'HOURLY'
  | 'DAILY'
  | 'WEEKLY'
  | 'MONTHLY'
  | 'YEARLY'

export type bookingDays =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'
