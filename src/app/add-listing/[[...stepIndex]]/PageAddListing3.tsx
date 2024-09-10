import React, { FC, useState } from 'react'
import Checkbox from '@/shared/Checkbox'

import Amenities from '../AmenitiesData'
import { it } from 'node:test'

export interface PageAddListing3Props {
  inputs?: any
  setInputs?: any
}

const PageAddListing3: FC<PageAddListing3Props> = ({ inputs, setInputs }) => {
  // const [inputs, setInputs] = useState([]);

  // store the values of the checkboxes in inputs array if checked and remove if unchecked
  const handleChange = (e: any, item: any) => {
    if (e) {
      setInputs((values: any) => {
        const updatedValues = Array.isArray(values)
          ? [...values, item.id]
          : [item.id]
        return updatedValues
      })
    } else {
      setInputs((values: any) => {
        const updatedValues = Array.isArray(values)
          ? values.filter((value) => value !== item.id)
          : []
        return updatedValues
      })
    }
  }

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
        <h2 className="text-2xl font-semibold">Amenities </h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Many customers have searched for accommodation based on amenities
          criteria
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      {/* FORM */}
      <div className="space-y-8">
        {Object.keys(Amenities).map((value: string, key: number) => {
          const amenitiesArray = Amenities[value] as {
            name: string
            id: string
          }[]
          return (
            // ITEM
            <div key={key}>
              <label className="text-lg font-semibold" htmlFor="">
                {value} Amenities
              </label>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {amenitiesArray.map(
                  (item: { name: string; id: string }, key: number) => {
                    return (
                      <Checkbox
                        key={key}
                        label={item.name}
                        name={item.id}
                        onChange={(e) => handleChange(e, item)}
                      />
                    )
                  }
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* <button onClick={handlePrint}>Print</button> */}
    </>
  )
}

export default PageAddListing3
