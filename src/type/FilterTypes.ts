// export interface CoordinatesType {
//   longitude: number;
//   latitude: number;
// }

export interface DateTimeType {
  fromDate: string | null
  fromTime: string
  toDate: string | null
  toTime: string
}
export interface BudgetType {
  minPrice: number
  maxPrice: number
}

export interface SecondaryFilterType {
  budget: BudgetType[]
  radius: number
  duration: number
  amenities: string[]
}

export interface PrimaryFilterType {
  space: 'Hot desk' | 'Cabins' | 'Meeting rooms' | 'Virtual office'
  coordinates?: [number, number] // An array of two numbers representing coordinates
  dateTime?: DateTimeType
  minCapacity: number
  page: number
}

export interface FilterTypes {
  primaryFilter: PrimaryFilterType
  secondaryFilter?: SecondaryFilterType
}
