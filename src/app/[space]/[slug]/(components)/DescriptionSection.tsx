import React from 'react'

interface Props {
  description: string
}

const DescriptionSection: React.FC<Props> = ({ description }) => {
  return (
    <div className="listingSection__wrap">
      <h2 className="text-2xl font-semibold">Description</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="text-neutral-6000 dark:text-neutral-300">
        <div
          dangerouslySetInnerHTML={{
            __html: description.replace(/\n/g, '<br>'),
          }}
        ></div>
      </div>
    </div>
  )
}

export default DescriptionSection
