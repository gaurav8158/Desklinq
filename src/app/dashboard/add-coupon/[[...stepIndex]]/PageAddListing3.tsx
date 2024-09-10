import React, { FC, useState, ChangeEvent, useEffect } from 'react'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import FormItem from '@/app/add-listing/FormItem'

interface PageAddListing3Props {
  inputs: { [key: string]: any }
  setInputs: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>
}

const PageAddListing3: FC<PageAddListing3Props> = ({ inputs, setInputs }) => {
  const [firstTimeCustomer, setFirstTimeCustomer] = useState(true)
  const [permittedUsers, setPermittedUsers] = useState<string[]>([])

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    switch (name) {
      case 'firstTimeCustomer':
        setFirstTimeCustomer(value === 'true') // Compare value to 'true'
        break

      case 'permittedUsers':
        setPermittedUsers([value])
        break
      default:
        break
    }
  }
  console.log(permittedUsers)

  useEffect(() => {
    setInputs((values) => ({
      ...values,
      firstTimeCustomer,
      permittedUsers: [...permittedUsers],
    }))
  }, [firstTimeCustomer, permittedUsers])

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setPermittedUsers([value]) // Fix: Wrap the value in an array
  }
  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e)
    handleUserChange(e)
  }

  return (
    <>
      <h2 className="text-2xl font-semibold">
        Your Coupon Customer Requirement
      </h2>
      <div>
        <FormItem label={`Only First Time Customer:`}>
          <Select
            id="firstTimeCustomer"
            name="firstTimeCustomer"
            value={firstTimeCustomer.toString()} // Convert boolean to string
            onChange={handleInputChange}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </Select>
        </FormItem>
      </div>

      <div>
        <FormItem label={`Permitted User:`}>
          <Input
            // id="permittedUsers"
            name="permittedUsers"
            defaultValue={permittedUsers}
            onChange={handleInputChange}
          />
        </FormItem>
      </div>
    </>
  )
}

export default PageAddListing3
