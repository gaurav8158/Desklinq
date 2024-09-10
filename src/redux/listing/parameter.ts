'use client'

import Amenities from '@/app/dashboard/add-property/AmenitiesData'
import { FilterTypes } from '@/type/FilterTypes'

const nextDay = new Date()
nextDay?.setDate(nextDay.getDate() + 2)

export function getFilter(state: FilterTypes) {
  const coordinates = state.primaryFilter.coordinates
  const fromDate = state.primaryFilter.dateTime?.fromDate
  const fromTime = state.primaryFilter.dateTime?.fromTime || '00:00'
  const toDate = state.primaryFilter.dateTime?.toDate
  const toTime = state.primaryFilter.dateTime?.toTime || '23:59'
  const minCapacity = state.primaryFilter.minCapacity
  const space = state.primaryFilter?.space
  const page = state.primaryFilter?.page
  const budget = state.secondaryFilter?.budget
  const radius = state.secondaryFilter?.radius
  const duration = state.secondaryFilter?.duration
  const amenities = state.secondaryFilter?.amenities

  const [minPrice, maxPrice] = budget || [0, 1000]
  const filter: Record<string, any> = {}
  if (coordinates) {
    filter.longitude = coordinates[0]
    filter.latitude = coordinates[1]
  }

  if (fromDate) {
    filter.fromDate = fromDate?.split('T')[0]
  }

  if (fromTime) {
    filter.fromTime = fromTime
  }

  if (toDate) {
    filter.toDate = toDate?.split('T')[0]
  }

  if (toTime) {
    filter.toTime = toTime
  }

  if (minCapacity) {
    filter.minCapacity = minCapacity
  }

  if (space) {
    const convertedString = space.toUpperCase().replace(/\s/g, '_')
    filter.space = convertedString
  }

  if (budget) {
    filter.minPrice = minPrice
    filter.maxPrice = maxPrice
  }

  if (radius) {
    filter.radius = radius
  }

  if (duration) {
    filter.duration = duration
  }

  if (amenities) {
    filter.amenities = amenities.toString()
  }

  if (page) {
    filter.page = page
  }

  return filter
}
