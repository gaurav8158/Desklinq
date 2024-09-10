// const Amenities = {
//     "Safety": [
//         "CCTV Surveillance",
//         "Security Guards",
//         "Access Control Systems",
//         "Fire Safety Equipment",
//         "Emergency Exits"
//     ],
//     "Space": [
//         "High-Speed Internet",
//         "Comfortable Seating",
//         "Air Conditioning",
//         "Natural Lighting",
//         "Noise-Cancelling Features"
//     ],
//     "Infrastructure": [
//         "Dedicated Desks",
//         "Private Cabins",
//         "Meeting Rooms",
//         "Conference Facilities",
//         "Phone Booths"
//     ],
//     "Connectivity": [
//         "Wi-Fi Connectivity",
//         "Ethernet Ports",
//         "Power Outlets",
//         "Charging Stations",
//         "Printing and Scanning Facilities"
//     ],
//     "Refreshment": [
//         "Coffee and Tea Stations",
//         "Snack Vending Machines",
//         "Water Dispensers",
//         "Kitchenette or Pantry",
//         "Microwaves and Refrigerators"
//     ],
//     "Collaboration": [
//         "Community Events and Workshops",
//         "Networking Opportunities",
//         "Co-working Spaces",
//         "Shared Lounges",
//         "Collaboration Tools"
//     ],
//     "Support": [
//         "Reception Services",
//         "Mail Handling",
//         "IT Support",
//         "Administrative Assistance",
//         "On-site Staff"
//     ],
// }

const Amenities: {
  [key: string]: { name: string; id: string }[]
} = {
  Safety: [
    { name: 'CCTV Surveillance', id: '60baf6e5eef3c16d8f2b3abe' },
    { name: 'Security Guards', id: '60baf6e5eef3c16d8f2b3abf' },
    { name: 'Access Control Systems', id: '60baf6e5eef3c16d8f2b3ac0' },
    { name: 'Fire Safety Equipment', id: '60baf6e5eef3c16d8f2b3ac1' },
    { name: 'Emergency Exits', id: '60baf6e5eef3c16d8f2b3ac2' },
  ],
  Space: [
    { name: 'High-Speed Internet', id: '60baf6e5eef3c16d8f2b3ac3' },
    { name: 'Comfortable Seating', id: '60baf6e5eef3c16d8f2b3ac4' },
    { name: 'Air Conditioning', id: '60baf6e5eef3c16d8f2b3ac5' },
    { name: 'Natural Lighting', id: '60baf6e5eef3c16d8f2b3ac6' },
    { name: 'Noise-Cancelling Features', id: '60baf6e5eef3c16d8f2b3ac7' },
  ],
  Infrastructure: [
    { name: 'Dedicated Desks', id: '60baf6e5eef3c16d8f2b3ac8' },
    { name: 'Private Cabins', id: '60baf6e5eef3c16d8f2b3ac9' },
    { name: 'Meeting Rooms', id: '60baf6e5eef3c16d8f2b3aca' },
    { name: 'Conference Facilities', id: '60baf6e5eef3c16d8f2b3acb' },
    { name: 'Phone Booths', id: '60baf6e5eef3c16d8f2b3acc' },
  ],
  Connectivity: [
    { name: 'Wi-Fi Connectivity', id: '60baf6e5eef3c16d8f2b3acd' },
    { name: 'Ethernet Ports', id: '60baf6e5eef3c16d8f2b3ace' },
    { name: 'Power Outlets', id: '60baf6e5eef3c16d8f2b3acf' },
    { name: 'Charging Stations', id: '60baf6e5eef3c16d8f2b3ad0' },
    {
      name: 'Printing and Scanning Facilities',
      id: '60baf6e5eef3c16d8f2b3ad1',
    },
  ],
  Refreshment: [
    { name: 'Coffee and Tea Stations', id: '60baf6e5eef3c16d8f2b3ad2' },
    { name: 'Snack Vending Machines', id: '60baf6e5eef3c16d8f2b3ad3' },
    { name: 'Water Dispensers', id: '60baf6e5eef3c16d8f2b3ad4' },
    { name: 'Kitchenette or Pantry', id: '60baf6e5eef3c16d8f2b3ad5' },
    { name: 'Microwaves and Refrigerators', id: '60baf6e5eef3c16d8f2b3ad6' },
  ],
  Collaboration: [
    { name: 'Community Events and Workshops', id: '60baf6e5eef3c16d8f2b3ad7' },
    { name: 'Networking Opportunities', id: '60baf6e5eef3c16d8f2b3ad8' },
    { name: 'Co-working Spaces', id: '60baf6e5eef3c16d8f2b3ad9' },
    { name: 'Shared Lounges', id: '60baf6e5eef3c16d8f2b3ada' },
    { name: 'Collaboration Tools', id: '60baf6e5eef3c16d8f2b3adb' },
  ],
  Support: [
    { name: 'Reception Services', id: '60baf6e5eef3c16d8f2b3adc' },
    { name: 'Mail Handling', id: '60baf6e5eef3c16d8f2b3add' },
    { name: 'IT Support', id: '60baf6e5eef3c16d8f2b3ade' },
    { name: 'Administrative Assistance', id: '60baf6e5eef3c16d8f2b3adf' },
    { name: 'On-site Staff', id: '60baf6e5eef3c16d8f2b3ae0' },
  ],
}

export default Amenities
