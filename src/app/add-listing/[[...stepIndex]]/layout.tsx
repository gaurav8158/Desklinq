'use client'

import React from 'react'
import { FC, useState } from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { Route } from '@/routers/types'

export interface CommonLayoutProps {
  children: React.ReactNode
  params: {
    stepIndex: string
  }
}

const CommonLayout: FC<CommonLayoutProps> = ({ children, params }) => {
  const index = Number(params.stepIndex) || 1
  // const nextHref = (
  //   index < 6 ? `/add-listing/${index + 1}` : `/`
  // ) as Route;
  // const backtHref = (
  //   index > 1 ? `/add-listing/${index - 1}` : `/add-listing/${1}`
  // ) as Route;
  // const nextBtnText = index > 5 ? "Publish listing" : "Continue";

  // const handleSubmit = async () => {
  //   switch (index) {
  //     case 1:
  //       console.log("PageAddListing1");
  //       break;
  //     case 2:
  //       console.log("PageAddListing2");
  //       break;
  //     case 3:
  //       console.log("PageAddListing3");
  //       break;
  //     case 4:
  //       console.log("PageAddListing4");
  //       break;
  //     case 5:
  //       console.log("PageAddListing5");
  //       break;
  //     case 6:
  //       console.log("PageAddListing6");
  //       const bodyData = JSON.parse(localStorage.getItem("desklink_listingData"));
  //       bodyData.vendor = "64959972b7c4592946f38112";

  //       const myToken = JSON.parse(localStorage.getItem('desklink_authToken'));

  //       try {
  //         const res = await fetch("http://127.0.0.1:8080/v1/properties/", {
  //           method: "POST",
  //           headers: {
  //             // "Access-Control-Allow-Origin": "http://127.0.0.1:8080/v1/properties/",
  //             "Content-Type": "application/json",
  //             "authorization": `Bearer ${myToken}`,
  //           },
  //           body: JSON.stringify(bodyData),
  //         });

  //         if (!res.ok) {
  //           throw new Error("Request failed with status " + res.status);
  //         }

  //         const data = await res.json();
  //         console.log(data);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //       break;

  //     default:
  //       break;
  //   }
  // };

  return (
    <div
      className={`nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-14 sm:py-24 lg:pb-32`}
    >
      <div className="space-y-11">
        <div>
          <span className="text-4xl font-semibold">{index}</span>{' '}
          <span className="text-lg text-neutral-500 dark:text-neutral-400">
            / 6
          </span>
        </div>

        {/* --------------------- */}
        <div>{children}</div>

        {/* --------------------- */}
        {/* <div className="flex justify-end space-x-5">
          <ButtonSecondary href={backtHref}>Go back</ButtonSecondary>
          <ButtonPrimary href={nextHref} onClick={handleSubmit}>
            {nextBtnText || "Continue"}
          </ButtonPrimary>
        </div> */}
      </div>
    </div>
  )
}

export default CommonLayout
