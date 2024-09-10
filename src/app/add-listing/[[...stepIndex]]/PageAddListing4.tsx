import React, { FC, useState } from 'react'
import Textarea from '@/shared/Textarea'

export interface PageAddListing4Props {
  inputs?: any
  setInputs?: any
}

const PageAddListing4: FC<PageAddListing4Props> = ({ inputs, setInputs }) => {
  // const [inputs, setInputs] = useState([]);

  const handleChange = (e: any) => {
    const value = e.target.value
    setInputs(value)
  }

  // const handlePrint = () => {
  //   const data = JSON.parse(localStorage.getItem("desklink_listingData"));
  //   data.description = inputs;
  //   localStorage.setItem("desklink_listingData", JSON.stringify(data));

  //   console.log(JSON.parse(localStorage.getItem("desklink_listingData")));
  // }

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">
          Your property description for client
        </h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Mention the best features of your accommodation, any special amenities
          like fast Wi-Fi or parking, as well as things you like about the
          location.
        </span>
      </div>

      <Textarea
        placeholder="..."
        rows={14}
        name="description"
        onChange={handleChange}
      />

      {/* <button onClick={handlePrint}>Print</button> */}
    </>
  )
}

export default PageAddListing4
