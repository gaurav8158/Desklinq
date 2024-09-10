import React, { FC, useState, ChangeEvent, useEffect } from 'react'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import FormItem from '@/app/add-listing/FormItem'
import { useSearchParams } from 'next/navigation'
import { useAppSelector } from '@/redux/app/hooks'
import ListingCard from '../../add-property/ListingCard'

interface PageAddListing4Props {
  inputs: { [key: string]: any }
  setInputs: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>
}

const PageAddListing4: FC<PageAddListing4Props> = ({ inputs, setInputs }) => {
  // const [firstTimeCustomer, setFirstTimeCustomer] = useState(true);
  const [addOfferings, setAddOfferings] = useState<string[]>([])

  const [offerings, setOfferings] = useState<any[]>([])
  const userData = useAppSelector((state) => state.userData)
  const searchParams = useSearchParams()

  const getOfferingData = async () => {
    try {
      // setIsLoading(true)
      const res = await fetch(
        `https://api-dev.desklinq.com/v1/offerings?cachebuster=${Math.random()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const offeringData = await res.json()
      setOfferings(offeringData.data)
    } catch (err) {
      console.error('Error fetching offerings:', err)
    }
  }
  useEffect(() => {
    getOfferingData()
  }, [])

  const data = offerings.filter(
    (listing) => listing.vendor === userData.user.id
  )
  console.log(data)

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    switch (name) {
      case 'addOfferings':
        if (
          e.target instanceof HTMLInputElement &&
          e.target.type === 'checkbox'
        ) {
          if (e.target.checked) {
            setAddOfferings((prev) => [...prev, value])
          } else {
            setAddOfferings((prev) =>
              prev.filter((category) => category !== value)
            )
          }
        }
        break
      default:
        break
    }
  }

  useEffect(() => {
    setInputs((values) => ({
      ...values,
      offerings: addOfferings,
    }))
  }, [addOfferings])
  console.log(addOfferings)

  return (
    <>
      <h2 className="text-2xl font-semibold">
        Select Offerings to avail your Coupon
      </h2>

      <FormItem label={`Select Offerings:`}>
        <br />
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Select</th>
            </tr>
          </thead>
          <tbody>
            {data.map((listing, index) => {
              return (
                <tr key={index} className="text-center border-b">
                  <td className="px-4 py-2">{listing.name}</td>
                  <td className="px-4 py-2">{listing.type}</td>
                  <td className="px-4 py-2">{listing.status}</td>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      name="addOfferings"
                      value={listing.id}
                      checked={addOfferings.includes(listing.id)}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </FormItem>
    </>
  )
}

export default PageAddListing4
