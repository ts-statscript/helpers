/**
 * Helper function to handle NaN values in an array.
 *
 * By default, the function does not remove NaN values and returns null if NaN values are found.
 *
 * @param array - The numeric array to be checked.
 * @param rmNaN - Boolean indicating how to handle NaN values. If true, NaN values are removed from the array, if false the function returns null as soon as a NaN value is found.
 * @param verbose - A boolean indicating whether to log the NaN values found. Default is false.
 * @returns The cleaned array if rmNaN is true, or null if NaN values are found and rmNaN is false.
 */
export function processArrNaN(
    array: number[],
    rmNaN: boolean = false,
    verbose: boolean = false
): number[] | null {
    const result: number[] = new Array(array.length);
    let last_non_NaN = 0;
    let hasNaN = false;

    for (let i = 0; i < array.length; i++) {
        const value = array[i];
        if (Number.isNaN(value)) {
            hasNaN = true;
            if (!rmNaN) {
                if (verbose) {
                    console.warn('Array contains a NaN value at position:', i);
                }
                return null; // Early exit if NaN found and rmNaN is false
            }
            if (verbose) {
                console.warn('Array contains a NaN value at position:', i);
            }
        } else {
            result[last_non_NaN++] = value; // Assign and increment in one step
        }
    }

    // Resize the array to the number of valid elements found
    result.length = last_non_NaN;

    return hasNaN ? result : array; // Return the original array if no NaN was found
}
