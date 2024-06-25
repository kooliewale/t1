import http from 'http';
import { URL } from 'url';

const PNR_SERVER = 'http://13.233.206.8:5000/getPNRinfo?pnr=';

// Function to fetch data from PNR server
export function fetchDataFromPNRServer(pnr) {
  return new Promise((resolve, reject) => {
    const url = new URL(PNR_SERVER + pnr);
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
