import axios, { endpoints } from 'src/utils/axios';

export function checkTokenValidation(token) {
  const URL = endpoints.auth.checkTokenValidation;

  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}?token=${token}`)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function confirmRegistration(params) {
  const URL = endpoints.auth.confirmRegistration;

  return new Promise((resolve, reject) => {
    axios
      .post(URL, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
