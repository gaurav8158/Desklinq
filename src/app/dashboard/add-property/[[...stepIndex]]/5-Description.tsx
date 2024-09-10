import React, { FC, ChangeEvent } from 'react'
import Textarea from '@/shared/Textarea'

export interface PageAddListing4Props {
  inputs: { [key: string]: any }
  setInputs: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>
}

const PageAddListing4: FC<PageAddListing4Props> = ({ inputs, setInputs }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name
    const value = e.target.value
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }))
  }

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
    </>
  )
}

export default PageAddListing4
