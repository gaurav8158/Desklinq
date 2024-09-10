export interface vendorBooking {
  property: {
    propertyId: string
    propertyName: string
  }
  offering: {
    offeringId: string
    offeringName: string
    offeringType: 'MEETING_ROOMS' | 'HOT_DESK' // Assuming fixed value for offeringType
  }
  customer: {
    customerId: string
    firstName: string
    lastName: string
    phone: string
    email: string
  }
  bookingInfo: {
    bookingId: string
    startTime: string // Assuming string representation of date-time
    endTime: string // Assuming string representation of date-time
    price: number
    capacity: number
    status: 'IN_PROGRESS' | 'CONFIRMED' | 'CANCELLED' // Assuming possible statuses
    confirmationCode: string
    updatedAt: string // Assuming string representation of date-time
  }
}
