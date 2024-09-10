const toISOStringWithLocalTime = (localDate: Date, localTimeString: String) => {
  try {
    // Parse the local time string into hours, minutes, and seconds
    const timeParts = localTimeString.split(':')
    const hours = parseInt(timeParts[0])
    const minutes = parseInt(timeParts[1])
    const seconds = timeParts.length === 3 ? parseInt(timeParts[2]) : 0

    // Create a Date object with the local date and time
    const date = new Date(localDate)
    date.setHours(hours, minutes, seconds)

    // Convert the Date object to ISO 8601 format with local time zone offset
    return date.toISOString()
  } catch (error) {
    console.error('Error converting to ISO string:', error)
    return null // Or throw an error if desired
  }
}

const toUTCTimeString = (localTimeString: string) => {
  try {
    // Parse the local time string into hours, minutes, and seconds
    const timeParts = localTimeString.split(':')
    const hours = parseInt(timeParts[0])
    const minutes = parseInt(timeParts[1])
    const seconds = timeParts.length === 3 ? parseInt(timeParts[2]) : 0

    // Create a Date object based on the current date and local time
    const date = new Date()
    date.setHours(hours, minutes, seconds)

    // Convert the Date object to UTC and format as a string
    const utcString = date.toISOString()

    // Extract only the time portion (HH:MM:SS)
    return utcString.split('T')[1].substr(0, 5)
  } catch (error) {
    console.error('Error converting to UTC string:', error)
    return null // Or throw an error if desired
  }
}

export { toISOStringWithLocalTime, toUTCTimeString }
