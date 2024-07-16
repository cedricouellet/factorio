/**
 * Determines whether or not a string is null, empty or whitespace
 * @param {String} str The string to check
 * @returns {Boolean} The resulting boolean
 */
function isNullOrWhiteSpace(str) {
  return str === undefined || str === null || str.trim() === "";
}

/**
 * Determines whether or not an array contains any elements
 * @param {Array} array The array to check
 * @returns {Boolean} The resulting boolean
 */
function any(array) {
  return array.length > 0;
}

/**
 * Determines whether or not an array contains any values matching a predicate
 * @param {Array} array The array to check
 * @param {*} predicate The predicate to determine the filter basis
 * @returns {Boolean} The resulting boolean
 */
function anyWhere(array, predicate) {
  return array.filter(predicate).length > 0;
}

/**
 * Parses a string to a float
 * @param {String} val The string to convert
 * @returns {Number} The resulting float or undefined if conversion failed
 */
function toFloat(val) {
  const parsed = parseFloat(val);

  if (isNaN(parsed)) {
    return undefined;
  }

  return parsed;
}

export default {
  isNullOrWhiteSpace,
  any,
  anyWhere,
  toFloat,
};
export { isNullOrWhiteSpace, any, anyWhere, toFloat };
