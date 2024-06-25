export const navigateTo = (pageName, platform) => {
  // Construct the URL with the platform query parameter
  const url = `public/views/${pageName}?platform=${platform}`;

  // Navigate to the specified URL
  window.location.href = url;
};

export const getUrlParam = (name, url = window.location.href) => {
  // Create a URL object to parse the URL
  const urlObj = new URL(url);

  // Create URLSearchParams object using the query string part of the URL
  const urlParams = new URLSearchParams(urlObj.search);

  // Retrieve the value of the parameter by name
  return urlParams.get(name);
};

export const updateUrlParameter = (param, value) => {
  // Get the current URL
  const url = new URL(window.location.href);

  // Update the URL parameter
  if (value !== null && value !== undefined) {
    url.searchParams.set(param, value);
  } else {
    url.searchParams.delete(param); // Remove the parameter if the value is null or undefined
  }

  // Update the browser's URL without reloading the page
  window.history.pushState({}, "", url);
};
