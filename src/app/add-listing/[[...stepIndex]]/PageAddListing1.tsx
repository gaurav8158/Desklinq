import React, { ChangeEvent, FC, useState } from 'react'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import FormItem from '../FormItem'

export interface PageAddListing1Props {
  inputs?: any
  setInputs?: any
}

const PageAddListing1: FC<PageAddListing1Props> = ({ inputs, setInputs }) => {
  // const [inputs, setInputs] = useState({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name
    const value = e.target.value
    setInputs((values: any) => ({ ...values, [name]: value }))
  }

  // const handlePrint = () => {
  //   localStorage.setItem("desklink_listingData", JSON.stringify(inputs));
  //   console.log(JSON.parse(localStorage.getItem("desklink_listingData")));
  // }

  return (
    <>
      <h2 className="text-2xl font-semibold">Choosing listing categories</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <FormItem label="Choose an offering type" desc="">
          <Select name="offerings" onChange={handleChange}>
            <option value="none" style={{ display: 'none' }}>
              -- Select one --
            </option>
            <option value="Meeting Room">Meeting Room</option>
            <option value="Hot desk">Hot desk</option>
          </Select>
        </FormItem>

        <FormItem
          label="Property name"
          desc="Your title is the gateway to bookings. Craft a magnetic one-liner that encapsulates your space's essence and leaves travelers eager to explore"
        >
          <Input
            placeholder="Property name"
            name="name"
            onChange={handleChange}
          />
        </FormItem>
      </div>

      {/* <button onClick={handlePrint}>Print</button> */}
    </>
  )
}

export default PageAddListing1
