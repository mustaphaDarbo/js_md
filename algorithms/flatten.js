export function flatten(arr) {
  const result = [];

  function helper(subArray) {
    for (let item of subArray) {
      if (Array.isArray(item)) {
        helper(item); // recursively flatten
      } else {
        result.push(item);
      }
    }
  }

  helper(arr);
  return result;
}

// Example test
console.log(flatten([1, [2, [3, 4]], 5])); // [1, 2, 3, 4, 5]
