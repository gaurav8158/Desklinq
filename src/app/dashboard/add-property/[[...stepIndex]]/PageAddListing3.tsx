import React, { FC, useEffect, useState } from 'react'
import Checkbox from '@/shared/Checkbox'
import { amenitiesData } from '@/config/config'

export interface PageAddListing3Props {
  inputs: { [key: string]: any }
  setInputs: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>
  propertyId: null | string
}

const PageAddListing3: FC<PageAddListing3Props> = ({
  inputs,
  setInputs,
  propertyId,
}) => {
  const listingDataString = localStorage.getItem(
    `desklink_listingData_${propertyId}`
  )
  const listingData = listingDataString ? JSON.parse(listingDataString) : []

  const [selectedCount, setSelectedCount] = useState(0)

  useEffect(() => {
    setInputs(listingData.amenities)
    setSelectedCount(listingData.amenities ? listingData.amenities.length : 0) // Set the selected count initially
  }, [])

  // store the values of the checkboxes in inputs array if checked and remove if unchecked
  const handleAmenitiesChange = (e: boolean, item: any) => {
    if (e) {
      setInputs((values) => {
        const updatedValues = Array.isArray(values)
          ? [...values, item.id]
          : [item.id]
        setSelectedCount(updatedValues.length) // Update the selected count
        return updatedValues
      })
    } else {
      setInputs((values) => {
        const updatedValues = Array.isArray(values)
          ? values.filter((value) => value !== item.id)
          : []
        setSelectedCount(updatedValues.length) // Update the selected count
        return updatedValues
      })
    }
  }

  // useEffect(() => {
  //   console.log(listingData.amenities)
  // }, [listingData])

  // const handlePrint = () => {
  //   console.log(inputs);

  //   const data = JSON.parse(localStorage.getItem("desklink_listingData"));
  //   data.amenities = inputs;
  //   localStorage.setItem("desklink_listingData", JSON.stringify(data));

  //   console.log(JSON.parse(localStorage.getItem("desklink_listingData")));
  // }

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Amenities</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Curate an irresistible amenities list – a snapshot of the luxuries and
          comforts awaiting your guests. Make every amenity a promise of an
          exceptional stay, leaving customers eager to indulge in the unique
          offerings of your space
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      {/* amenities */}
      <div className="space-y-8">
        {Object.keys(amenitiesData)
          .filter((value: string, key: number) => value !== 'SPACE')
          .map((value: string, key: number) => {
            return (
              <div key={key}>
                <label
                  className="text-base font-semibold capitalize"
                  htmlFor=""
                >
                  {value} Amenities
                </label>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {amenitiesData[value as keyof typeof amenitiesData].map(
                    (item: any, key: number) => {
                      return (
                        <Checkbox
                          defaultChecked={
                            listingData.amenities
                              ? !!listingData.amenities.includes(item.id)
                              : false
                          }
                          key={key}
                          label={item.Name}
                          name={item.id}
                          onChange={(e) => handleAmenitiesChange(e, item)}
                        />
                      )
                    }
                  )}
                </div>
              </div>
            )
          })}
      </div>
      <p>Total selected amenities: {selectedCount}</p>
    </>
  )
}

export default PageAddListing3
