import http from 'http';
import { URL } from 'url';

const LIVE_TRAIN_SERVER = 'http://13.233.206.8:5000/liveTrainInfo';

// Function to fetch data from Live Train server
export function fetchDataFromLiveTrainServer(trainNo, date) {
  return new Promise((resolve, reject) => {
    // Constructing the URL with query parameters
    const url = new URL(LIVE_TRAIN_SERVER);
    url.searchParams.append('trainNo', trainNo);
    if (date) {
      url.searchParams.append('date', date);
    }

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
