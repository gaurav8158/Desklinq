import React, { FC, ChangeEvent, useState, useEffect } from 'react'
import Input from '@/shared/Input'
import { useSearchParams } from 'next/navigation'
import ImageInput from '@/components/ImageInput'

export interface PageAddListing4Props {
  inputs: { [key: string]: any }
  setInputs: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>
  propertyId: null | string
}

const PageAddListing4: FC<PageAddListing4Props> = ({ inputs, setInputs }) => {
  const queryParams = useSearchParams()
  const propertyId = queryParams.get('id')

  const listingDataString = localStorage.getItem(
    `desklink_listingData_${propertyId}`
  )
  const listingData = listingDataString ? JSON.parse(listingDataString) : []

  const [imageFields, setImageFields] = useState(listingData?.images || [])

  const [totalImages, setTotalImages] = useState<number[]>([])

  // const [imageFields, setImageFields] = useState([])

  useEffect(() => {
    setInputs(imageFields)
  }, [imageFields])

  const addFields = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const lastInput = imageFields[imageFields.length - 1]
    // Check if the last input field is not empty
    if (lastInput !== '') {
      setImageFields([...imageFields, ''])
    }
    // setImageFields([...imageFields, ''])
  }

  const removeFields = (i: number) => {
    let data = [...imageFields]
    data.splice(i, 1)
    setImageFields(data)

    setInputs((values) => ({ ...values, images: data }))
  }

  useEffect(() => {
    console.log(inputs)
  }, [inputs])

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
        <span className="text-lg font-semibold">Cover images</span>
        {/* <div className="mt-5 ">
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
          </div> */}

        <div className="mb-6">
          {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Images
          </label> */}

          {imageFields.map((input: string, i: number) => {
            // Use a unique identifier for the key
            const uniqueKey = `<span class="math-inline">${i}-</span>${
              Math.random() + Math.random()
            }`
            return (
              <div key={uniqueKey} className="flex justify-between gap-3 mb-2">
                <ImageInput
                  i={i}
                  imageFields={imageFields}
                  setImageFields={setImageFields}
                  setInput={setInputs}
                />
                <button onClick={() => removeFields(i)}>
                  <i className="las la-trash text-2xl text-red-600 hover:text-red-800"></i>
                </button>
              </div>
            )
          })}

          <button
            onClick={addFields}
            className={`text-white justify-center flex items-center bg-green-700 hover:bg-green-800 w-auto focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 mx-auto mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
              imageFields[imageFields.length - 1] === ''
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            disabled={imageFields[imageFields.length - 1] === ''}
          >
            <i className="las la-plus-circle text-xl mr-2.5"></i> Add
          </button>
        </div>
      </div>
      {imageFields.length < 4 && (
        <div className="text-red-500">Minimum 4 images required</div>
      )}
    </>
  )
}

export default PageAddListing4
