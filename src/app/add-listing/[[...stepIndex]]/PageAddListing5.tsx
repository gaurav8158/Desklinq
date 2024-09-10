import React, { FC, useState } from 'react'
import Input from '@/shared/Input'

export interface PageAddListing5Props {
  inputs?: any
  setInputs?: any
}

const PageAddListing5: FC<PageAddListing5Props> = ({ inputs, setInputs }) => {
  // const [inputs, setInputs] = useState([]);

  const handleChange = (e: any) => {
    const name = e.target.name
    const value = e.target.value
    const order = parseInt(name.split('_')[1])

    setInputs((prevInputs: any) => {
      if (Array.isArray(prevInputs)) {
        const existingInput = prevInputs.find((input) => input.order === order)

        if (existingInput) {
          return prevInputs.map((input) =>
            input.order === order
              ? { ...input, [name.split('_')[0]]: value }
              : input
          )
        } else {
          const newInput = {
            order: order,
            [name.split('_')[0]]: value,
          }
          return [...prevInputs, newInput]
        }
      } else {
        // Handle the case when prevInputs is not an array
        // For example, initialize it as an empty array
        return [
          {
            order: order,
            [name.split('_')[0]]: value,
          },
        ]
      }
    })
  }

  // const handlePrint = () => {
  //   const data = JSON.parse(localStorage.getItem("desklink_listingData"));
  //   data.images = inputs;
  //   localStorage.setItem("desklink_listingData", JSON.stringify(data));

  //   console.log(JSON.parse(localStorage.getItem("desklink_listingData")));
  // }

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Pictures of the place</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          A few beautiful photos will help customers have more attraction
          towards your property.
        </span>
      </div>

      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      {/* FORM */}
      <div className="space-y-8">
        <div>
          <span className="text-lg font-semibold">Cover image</span>
          <div className="mt-5 ">
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-neutral-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
          <Input
            className="mt-4"
            placeholder="Image url"
            name="uri_1"
            onChange={handleChange}
          />
          <Input
            className="mt-4"
            placeholder="Image description"
            name="description_1"
            onChange={handleChange}
          />
        </div>

        {/* ----------------- */}

        <div>
          <span className="text-lg font-semibold">Pictures of the place</span>
          <div className="mt-5 ">
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-neutral-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                  <label
                    htmlFor="file-upload-2"
                    className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload-2"
                      name="file-upload-2"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
          <Input
            className="mt-4"
            placeholder="Image url"
            name="uri_2"
            onChange={handleChange}
          />
          <Input
            className="mt-4"
            placeholder="Image description"
            name="description_2"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* <button onClick={handlePrint}>Print</button> */}
    </>
  )
}

export default PageAddListing5
