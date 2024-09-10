import type { StepType } from '@reactour/tour'

const dashBoardHomeSteps: StepType[] = [
  {
    selector: '.sidebar',
    content:
      'This is the sidebar where you can navigate through different sections.',
  },
  {
    selector: '.properties',
    content:
      'Create, Edit or Delete a property listing for one or multiple locations.',
  },
  {
    selector: '.offerings',
    content:
      'Every property listing can have multiple offerings like meeting rooms, hot desks, private offices, etc., which can be added and edited from here.',
  },
  {
    selector: '.coupons',
    content:
      'Add or edit different coupons to facilitate discounts or free usage. Control how many times or the number of people who can avail a coupon can be used and its validity.',
  },
  {
    selector: '.bookings',
    content:
      'Check consoleidated bookings statues from all your properties and offerings. Filter by choice',
  },
]

const createPropertySteps: StepType[] = [
  {
    selector: '[data-tour-property="step-1"]',
    content: 'Click here if you need help.',
  },
  {
    selector: '[data-tour-property="step-2"]',
    content: 'Click here to add a new property.',
  },
  {
    selector: '[data-tour-property="step-3"]',
    content:
      'Click on a property to view more details. You can also edit or delete a property from here.',
  },
]

const offeringDrawerSteps: StepType[] = [
  {
    selector: '[data-tour-offering="step-1"]',
    content: 'Offering type goes here. e.g. Meeting Room, Hot Desk, etc.',
    position: 'left',
  },
  {
    selector: '[data-tour-offering="step-2"]',
    content: 'offering name goes here.',
    position: 'left',
  },
  {
    selector: '[data-tour-offering="step-3"]',
    content: 'Description of the offering goes here.',
    position: 'left',
  },
  {
    selector: '[data-tour-offering="step-4"]',
    content: 'Capacity of the offering goes here.',
    position: 'left',
  },
  {
    selector: '[data-tour-offering="step-5"]',
    content:
      'Pricing of the offering goes here. with the option of hourly, daily, weekly, monthly, etc.',
    position: 'left',
  },
  {
    selector: '[data-tour-offering="step-6"]',
    content: 'Amenities of the offering goes here.',
    position: 'left',
  },
  {
    selector: '[data-tour-offering="step-7"]',
    content: 'Offering images goes here. with minimum 4 images required.',
    position: 'left',
  },
  {
    selector: '[data-tour-offering="step-8"]',
    content: 'Rules of the offering goes here.',
    position: 'left',
  },
  {
    selector: '[data-tour-offering="step-9"]',
    content: 'Cancellation policy of the offering goes here.',
    position: 'left',
  },
  {
    selector: '[data-tour-offering="step-10"]',
    content: 'Special notes of the offering goes here.',
    position: 'left',
  },
  {
    selector: '[data-tour-offering="step-11"]',
    content: 'Save the offering here.',
    position: 'left',
  },
]
export { dashBoardHomeSteps, offeringDrawerSteps, createPropertySteps }
