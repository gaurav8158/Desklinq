/**
 * Formats a string by replacing underscores with spaces, converting to lowercase,
 * and capitalizing the first letter of each word.
 *
 * @param input - The string to format.
 * @returns The formatted string.
 */

function formatString(input: string): string {
  return input
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (char: string) => char.toUpperCase())
}

// Example usage:
// const formattedString = formatString('HELLO_WORLD_THIS_IS_AN_EXAMPLE')
// Output: "Hello World This Is An Example"

export default formatString
