/**
 * Removes all non-digit characters from the given string.
 *
 * @param {string} raw - The input string containing digits and possibly other characters.
 * @returns {string} A new string containing only numeric characters.
 *
 * @example
 * const result = removeNonDigits("Phone: 123-456-7890");
 * console.log(result); // "1234567890"
 */
export function removeNonDigits(raw: string): string {
    return raw.replace(/[\D]+/g, "");
}

/**
 * Removes accents from characters in the given string.
 *
 * @param {string} text - The input string that may contain accented characters.
 * @returns {string} A new string without accent marks.
 *
 * @example
 * const result = removeAccent("Café");
 * console.log(result); // "Cafe"
 */
export function removeAccent(text: string): string {
    return text.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/**
 * Returns a random element from the given array.
 *
 * @template T
 * @param {T[]} array - An array of elements.
 * @returns {T} A randomly selected element from the array.
 *
 * @example
 * const colors = ["red", "blue", "green"];
 * const randomColor = getRandomElement(colors);
 * console.log(randomColor); // e.g., "blue"
 */
export function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}
