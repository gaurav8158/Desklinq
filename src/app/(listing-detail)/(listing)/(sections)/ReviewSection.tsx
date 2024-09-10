import CommentListing from '@/components/CommentListing'
import { Review } from '@/data/lisiting-details'
import ButtonClose from '@/shared/ButtonClose'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'

interface Props {
  reviews: Review[]
  vendor: any
  updatedReviews: Review[]
}
const ReviewSection: React.FC<Props> = ({
  reviews,
  vendor,
  updatedReviews,
}) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  const renderModalReviews = () => {
    return (
      <Transition appear show={isReviewModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() => setIsReviewModalOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block py-8 h-screen w-full max-w-4xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      Reviews
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose
                        onClick={() => setIsReviewModalOpen(false)}
                      />
                    </span>
                  </div>
                  <div className="px-8 py-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    {updatedReviews?.map((review, index) => (
                      <div
                        key={review.id}
                        className={`${index !== 0 ? 'mt-6' : ''}`}
                      >
                        <div className="flex items-start space-x-3 py-4">
                          <CommentListing
                            data={{
                              name: review.user,
                              date: review.feedback.createdAt,
                              comment: review.feedback.comment,
                              starPoint: 3,
                            }}
                          />
                        </div>
                        {review?.response && (
                          <div className="pl-10 mt-4">
                            <CommentListing
                              data={{
                                name:
                                  vendor?.firstName +
                                  ' ' +
                                  vendor?.lastName +
                                  ' (Owner)',
                                date: review.response.createdAt,
                                comment: review.response.comment,
                                starPoint: 0,
                              }}
                              showStars={false}
                              className="bg-indigo-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    )
  }
  return (
    <>
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">
          Reviews ({reviews?.length} reviews)
        </h2>

        {/* Content */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {updatedReviews?.slice(0, 3).map((review) => (
            <div key={review.id} className="py-8">
              <CommentListing
                data={{
                  name: review.user,
                  date: review.feedback.createdAt,
                  comment: review.feedback.comment,
                  starPoint: 3,
                }}
              />
              {review?.response && (
                <CommentListing
                  data={{
                    name:
                      vendor?.firstName + ' ' + vendor?.lastName + ' (Owner)',
                    date: review.response.createdAt,
                    comment: review.response.comment,
                    starPoint: 0,
                  }}
                  showStars={false}
                  className="bg-indigo-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-lg mt-4 dark:bg-neutral-900"
                />
              )}
            </div>
          ))}
        </div>

        <ButtonSecondary onClick={() => setIsReviewModalOpen(true)}>
          View all Reviews
        </ButtonSecondary>
      </div>
      {renderModalReviews()}
    </>
  )
}

export default ReviewSection
