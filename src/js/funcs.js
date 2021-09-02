import icons from 'url:../img/icons.svg';
import { TIMEOUT_SEC } from './config';

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, inputData = null) {
  try {
    const fetchPro = inputData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    if (!res.ok)
      throw new Error(
        `${data.message} --- (${res.status}) --- failed to upload or retreive selected recipe`
      );

    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
};
