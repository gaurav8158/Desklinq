export interface GuestsObject {
  guestAdults?: number
}

export type StaySearchFormFields = 'location' | 'co-workers' | 'dates'

export interface PropertyType {
  name: string
  description: string
  checked: boolean
}

export interface ClassOfProperties extends PropertyType {}

export type DateRage = [Date | null, Date | null]
