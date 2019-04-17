export const httpError = (handleResponseError) => (error) => {
  if (error.response) { // responded with an error code
    handleResponseError(error);
  }
  else if (error.request) { // no response received
    alert('Communication failed. Please check your internet connection.'); // eslint-disable-line no-alert
  }
  else { // unknown error
    alert('Unknown networking error'); // eslint-disable-line no-alert
  }
};
