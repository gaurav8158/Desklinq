import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

interface PopUpProps {
  className?: string
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  title: string
  description: string
  button?: string
}
export const PopUp: React.FC<PopUpProps> = ({
  title,
  description,
  isOpen,
  setIsOpen,
  button,
  className,
}) => {
  function closeModal() {
    setIsOpen(false)
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`w-full max-w-md transform overflow-hidden rounded-2xl  p-6 text-left align-middle bg-white dark:bg-neutral-800 shadow-xl transition-all`}
                >
                  <Dialog.Title
                    as="h2"
                    className={`text-2xl p-2 font-medium leading-6 ${className} text-center uppercase`}
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-md text-gray-500 dark:text-neutral-200 text-center">
                      {description}
                    </p>
                  </div>

                  {button?.length && (
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        {button || 'Close'}
                      </button>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}