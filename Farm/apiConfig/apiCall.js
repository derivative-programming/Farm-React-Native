import { apiInstance } from ".";
export const apiCall = (config) => {
  return new Promise((resolve, reject) => {
    apiInstance(config)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log('Error occurred during API call:');

        // Log the error message
        if (err.message) {
          console.log(`Error Message: ${err.message}`);
        }

        // Log response details if available
        if (err.response) {
          console.log(`Status Code: ${err.response.status}`);
          console.log('Response Data:', err.response.data);
          console.log('Response Headers:', err.response.headers);
        } else {
          console.log('No response received from the server.');
        }

        // Log the original request config
        if (err.config) {
          console.log('Request Config:', err.config);
        }

        reject(err); // Pass the error up to be handled by the caller
      });
  });
};