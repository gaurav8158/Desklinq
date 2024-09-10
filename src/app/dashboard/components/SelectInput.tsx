'use client'

import React, { useState, Fragment, useEffect } from 'react'
import { Transition, Listbox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

export interface SelectInputProps {
  label?: string
  className?: string
  values?: Array<any>
  defaultValue?: any
  setInput: Function
}

const types = [
  {
    id: 1,
    name: 'Meeting Room',
    value: 'MEETING_ROOMS',
    avatar:
      'https://images.unsplash.com/photo-1576073460027-794a4ab09b12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVldGluZyUyMHJvb218ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60',
  },
  {
    id: 2,
    name: 'Hot desk',
    value: 'HOT_DESK',
    avatar:
      'https://images.unsplash.com/photo-1534430071631-854ff55eec78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG90JTIwZGVza3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60',
  },
  {
    id: 3,
    name: 'Office Space',
    value: 'OFFICE_SPACE',
    avatar:
      'https://images.unsplash.com/photo-1631630259742-c0f0b17c6c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2FiaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60',
  },
  {
    id: 4,
    name: 'Virtual Office',
    value: 'VIRTUAL_OFFICE',
    avatar:
      'https://images.unsplash.com/photo-1664575197229-3bbebc281874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlydHVhbCUyMG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60',
  },
]
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  className,
  values = types,
  defaultValue,
  setInput,
}) => {
  const [defaultSelect, setDefaultSelect] = useState<any>(values[0])

  useEffect(() => {
    switch (defaultValue) {
      case 'MEETING_ROOMS':
        setDefaultSelect(values[0])
        break
      case 'HOT_DESK':
        setDefaultSelect(values[1])
        break
      case 'CABINS':
        setDefaultSelect(values[2])
        break
      case 'VIRTUAL_OFFICE':
        setDefaultSelect(values[3])
        break
      default:
        setDefaultSelect(values[0])
        break
    }
  }, [defaultValue])

  const [selected, setSelected] = useState<any>(defaultSelect)

  useEffect(() => {
    setInput((prevInput: any) => ({ ...prevInput, type: selected?.value }))
  }, [selected])

  useEffect(() => {
    setSelected(defaultSelect)
  }, [defaultSelect])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
            {label}
          </Listbox.Label>
          <div className={`relative mt-2 ${className}`}>
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <Image
                  src={selected?.avatar}
                  alt=""
                  className="h-5 w-5 flex-shrink-0 rounded-full"
                  height={500}
                  width={500}
                />
                <span className="ml-3 block truncate">{selected?.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {values.map((type) => (
                  <Listbox.Option
                    key={type.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={type}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <Image
                            src={type.avatar}
                            alt=""
                            className="h-5 w-5 flex-shrink-0 rounded-full"
                            height={500}
                            width={500}
                          />
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate'
                            )}
                          >
                            {type.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default SelectInput
