function createRequest(urlPath, headers = {}, paramObj = {}) {
  const paramsPath = Object.entries(paramObj || {})
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  const url = `${urlPath}?${paramsPath}`;
  return { url, headers };
}

export default createRequest;
