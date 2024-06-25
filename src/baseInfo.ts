import http from 'http';
import { URL } from 'url';

const BASE_URL = 'http://52.66.81.201:4000/trains/';

// Function to fetch train route from server
export function fetchTrainRoute(trainNo) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + 'getRoute');
    url.searchParams.append('trainNo', trainNo);

    const options = {
      method: 'GET',
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
    };

    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(responseData));
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// Function to fetch train information from server
export function fetchTrainInfo(trainNo) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + 'getTrain');
    url.searchParams.append('trainNo', trainNo);

    const options = {
      method: 'GET',
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
    };

    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(responseData));
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}
