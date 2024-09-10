'use client'

import React, { useState, useEffect } from 'react'
import { useAppSelector } from '@/redux/app/hooks'

const ImageInput = ({ i, imageFields, setImageFields, setInput }) => {
  const userData = useAppSelector((state) => state.userData)
  const [fileLink, setFileLink] = useState()
  const [base64Image, setBase64Image] = useState('')

  function removeImageFormatPrefix(encodedString) {
    const supportedFormats = [
      'png',
      'jpeg',
      'jpg',
      'gif',
      'webm',
      'webp',
      'heif',
      'svg',
      'tiff',
    ]
    // Check if the string starts with any of the supported prefixes
    const prefix = supportedFormats.find((format) =>
      encodedString.startsWith(`data:image/${format};base64,`)
    )

    if (prefix) {
      // Remove the prefix
      return encodedString.slice(`data:image/${prefix};base64,`.length)
    } else {
      return encodedString
    }
  }

  const saveImage = (link, i) => {
    let data = [...imageFields]
    data[i] = link
    setImageFields(data)
    setInput((values) => ({ ...values, images: data }))
  }

  const uploadMedia = async () => {
    const myToken = userData?.token?.access?.token
    try {
      const res = await fetch('https://api-dev.desklinq.com/v1/media/upload', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${myToken}`,
        },
        body: JSON.stringify({
          payload: base64Image,
        }),
      })

      const data = await res.json()

      if (data?.success) {
        const publicUrl = data?.data?.Location
        console.log(publicUrl)
        // setImageFields((values) => [...values, publicUrl]);
        saveImage(publicUrl, i)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (e) => {
    const file = e.target.files[0]
    console.log(file)
    if (file) {
      setFileLink(URL.createObjectURL(file))

      const reader = new FileReader()
      reader.onloadend = () => {
        // When the reading operation is successfully completed, set the base64 data
        setBase64Image(removeImageFormatPrefix(reader.result))
        // uploadMedia();
      }
      // Read the file as a data URL (base64-encoded string)
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    base64Image !== '' && uploadMedia()
  }, [base64Image])

  useEffect(() => {
    imageFields && imageFields[i] && setFileLink(imageFields[i])
  }, [])

  const isDisabled = imageFields && imageFields[i]
  const combinedClassName = `relative h-auto block w-[100px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding
    px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition 
    duration-300 ease-in-out file:h-full file:-mx-3 file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] 
    file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary ${
      isDisabled
        ? 'cursor-not-allowed file:cursor-not-allowed'
        : 'cursor-pointer file:cursor-pointer'
    }`

  return (
    <div className=" flex gap-2 justify-center w-[100%]">
      <a
        href={fileLink}
        target="_blank"
        className=" cursor-pointer  border border-solid border-neutral-300 rounded  "
      >
        {isDisabled ? (
          <img src={fileLink} className="w-12 h-10" alt="" />
        ) : (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={0.6}
              stroke="black"
              className="w-12 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
          </div>
        )}

        {/* <i className="las la-eye text-lg"></i> */}
      </a>

      {/* <div>
        {!isDisabled && (
          <button
            onClick={onUploadClick}
            className="text-white  bg-gray-950   hover:bg-zinc-900  focus:outline-none  
                  font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-gray-950 dark:hover:bg-zinc-900
                  dark:focus:bg-zinc-900 w-full mt-1"
          >
            Upload
          </button>
        )}
      </div> */}

      {!isDisabled ? (
        <input
          // className="relative h-auto cursor-pointer block w-auto min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:h-full file:-mx-3 file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
          className={combinedClassName}
          placeholder="Image"
          type="file"
          onChange={handleChange}
          accept="image/*"
          disabled={imageFields && imageFields[i] ? true : false}
        />
      ) : (
        <input placeholder={fileLink} className={combinedClassName} disabled />
      )}
    </div>
  )
}

export default ImageInput
