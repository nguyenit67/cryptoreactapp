export function capitalize(string = '') {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export function createRequest(urlPath, headers = {}, paramObj = {}) {
  const paramsPath = Object.entries(paramObj || {})
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  const url = `${urlPath}?${paramsPath}`;
  return { url, headers };
}
