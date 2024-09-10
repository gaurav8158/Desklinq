export const formatCurrency = (
  price: number | undefined = 0,
  currency: string | undefined = 'USD'
) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price)
}

export function generateRandomCode() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const digits = '0123456789'

  let code = 'LNQ'

  for (let i = 0; i < 6; i++) {
    if (i < 3) {
      code += letters.charAt(Math.floor(Math.random() * letters.length))
    } else {
      code += digits.charAt(Math.floor(Math.random() * digits.length))
    }
  }

  return code
}

export const calculateEndTime = (startTime: string, durationHours: number) => {
  const [startHours, startMinutes] = startTime.split(':').map(Number)
  const totalStartMinutes = startHours * 60 + startMinutes
  const totalEndMinutes = totalStartMinutes + durationHours * 60

  // Ensure the end time is within the same day (24 hours)
  const endHours = Math.floor(totalEndMinutes / 60) % 24
  const endMinutes = totalEndMinutes % 60

  // Format the end time as "HH:mm"
  return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(
    2,
    '0'
  )}`
}

export const updateDateTimeWithTime = (
  originalDateTime: Date,
  time: string
) => {
  const originalDate = new Date(originalDateTime)
  const [hours, minutes] = time.split(':').map(Number)
  const updatedDate = new Date(originalDate)
  updatedDate.setHours(hours)
  updatedDate.setMinutes(minutes)
  updatedDate.setSeconds(0)
  const updatedDateTimeString = updatedDate.toISOString()

  return updatedDateTimeString
}

export const dateRender = (startDate: any, offeringType?: string) => {
  // const offering = offeringType == "MEETING_ROOMS";
  let timeFormatter = ''
  //   const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const fromDate = new Date(startDate)
  const formattedTime = fromDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
  // if (!offering) {
  timeFormatter = ` at ${formattedTime}`
  // }
  let dateFormatter =
    fromDate.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }) || 'NA'

  return dateFormatter + timeFormatter
}

export const dateRender2 = (startDate: any, endDate: any) => {
  const fromDate = new Date(startDate)
  const toDate = new Date(endDate)
  let checkIn =
    fromDate.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
    }) || 'Add dates'
  let checkOut = toDate
    ? ' - ' +
      toDate.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
      })
    : ''
  return checkIn + checkOut
}

export const dateRenderBooking = (date: string) => {
  const fromDate = new Date(date)
  let checkIn =
    fromDate.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }) || 'NA'
  return checkIn
}

export const changeString = (givenStr: string): string => {
  return givenStr
    ?.replace(/_/g, ' ')
    ?.toLowerCase()
    ?.replace(/\b\w/g, (char) => char.toUpperCase())
}
