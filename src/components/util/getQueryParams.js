// utils.js
export function getQueryParams(search) {
  const params = new URLSearchParams(search);
  const queryParams = {};
  for (let [key, value] of params.entries()) {
    queryParams[key] = value;
  }
  return queryParams;
}
