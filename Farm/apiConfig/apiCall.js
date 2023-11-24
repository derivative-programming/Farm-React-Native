import { apiInstance } from ".";

export const apiCall = (config) => {
  return new Promise((resolve, reject) => {
    apiInstance(config)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log('error...');
        console.log(err);
        reject(err);
      });
  });
};
