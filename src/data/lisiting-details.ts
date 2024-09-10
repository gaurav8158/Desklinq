import BaseService from '@/service/BaseService'
import { ImageType, OfferingType } from '@/type/propertiesTypes'

export interface PropertyData {
  name: string
  address: {
    street: string
    city: string
    state: string
    country: string
    pin: number
    landmark: string
    houseNumber: string
    area: string
    description: string
  }
  description: string
  amenities: object[]
  rating: number
  offerings: OfferingType[]
  vendor: string
  status: string
  images: [string]
  id: string
}
export interface Property {
  success: boolean
  data: PropertyData
}
export interface Amenity {
  id: string
  name: string
  icon: string
  Image: string
  info: string
  category: string
}
// export interface Amenity {
// 	success: boolean;
// 	data: AmenityData;
// }
interface additionalInfo {
  rules: {
    title: string
    data: string[] | []
  }
  cancellationPolicy: {
    title: string
    data: string[] | []
  }
  specialNote: {
    title: string
    data: string[] | []
  }
  title: string
}
export interface OfferingData {
  type: string
  name: string
  capacity: number
  amenities: Amenity[]
  pricing: Pricing[]
  images: [string]
  id: string
  additionalInfo: additionalInfo
  description: string
  address: {
    street: string
    city: string
    state: string
    country: string
    pin: number
    landmark: string
    houseNumber: string
    area: string
    description: string
    location: {
      type: string
      coordinates: [number, number]
    }
  }
}
export interface Offering {
  success: boolean
  data: OfferingData
}
export interface pricingSchema {
  duration: string
  area: string
  price: number
}
export interface Pricing {
  price: number
  context: string
  duration: string
  area: string
  currency: string
  // Updated to pricingSchema[]
  info: string
  length: number
  startTime: string
}
export interface Comments {
  rating: any
  user: string
  comment: string
  createdAt: string
}
export interface Review {
  id: string
  userId: string
  user: string
  propertyId: string
  rating: number
  feedback: Comments
  response: Comments
}

export async function getPropertyDetails(
  propertyId: string,
  offeringId: string
) {
  try {
    const baseService = new BaseService()
    const propertyResponse = await baseService.doGet<any>(
      `/properties/${propertyId}`
    )

    // console.log(propertyResponse)
    const propertyData = propertyResponse.data

    const offeringResponse = await baseService.doGet<Offering>(
      `/offerings/${offeringId}?cachebuster=${Math.random() * 10}}`
    )

    const offeringData = offeringResponse
    const amenities = offeringData.data.amenities
    const price = offeringData.data.pricing
    const vendorResponse = await baseService.doGet<any>(
      `/users/${propertyData.vendor}`
    )
    const vendorData = vendorResponse.data
    const vendor = vendorData
    const reviewResponse = await baseService.doGet<any>(
      `/review?propertyId=${propertyId}`
    )
    const reviewData = reviewResponse.data
    const reviews = reviewData

    const property: PropertyData = {
      name: propertyData.name,
      address: propertyData.address,
      description: propertyData.description,
      amenities: propertyData.amenities,
      rating: propertyData.rating,
      offerings: propertyData.offerings,
      vendor: propertyData.vendor,
      status: propertyData.status,
      images: propertyData.images,
      id: propertyData._id,
    }

    return { property, amenities, price, vendor, reviews }
  } catch (error) {
    console.error('Error fetching property details:', error)
    throw error // Propagate the error to the caller
  }
}
export async function getOfferingDetails(offeringId: string) {
  try {
    const baseService = new BaseService()
    const offeringResponse = await baseService.doGet<Offering>(
      `/offerings/${offeringId}`
    )
    // console.log(offeringResponse)
    const offeringData = offeringResponse.data
    const price = offeringData.pricing
    const amenities = offeringData.amenities
    // console.log(amenities);

    return { offeringData, price, amenities }
  } catch (error) {
    console.error('Error fetching offering details:', error)
  }
}
