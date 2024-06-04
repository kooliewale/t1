// In src/index.js 
const express = require("express"); 
const bodyParser = require("body-parser");
const cors=require("cors");
const axios = require('axios');
const app = express(); 

const PORT = process.env.PORT||4500; 
const IP='http://127.0.0.1';
const PROJECT=process.env.PROJECT||'KT';
const VERSION=process.env.VERSION|'v0.0.1';
const serverStartTime = new Date();  

const DB_LINK=require('./db_connect.js');
app.use(bodyParser.json());
app.use(cors());  



// Middleware function to log details for all requests
const logRequest = (req, res, next) => {
  console.log(`--- Request Details ---`);
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);
  console.log(`Headers:`);
  console.dir(req.headers); // Use console.dir for better formatting
  console.log(`Body:`);
  console.dir(req.body);   // Access body data for POST requests (if applicable)

  // Allow further processing in the request-response cycle
  next();
};

// Apply the middleware to handle all requests
app.use(logRequest);

const BASE_URL ='https://api.weatherapi.com/v1'
app.all('*', (req, res) => {

  if (req.url.endsWith('/current.json')) 
  { 
    const fullUrl = `${BASE_URL}${req.url}`; // Construct complete URL
    console.log(fullUrl);
    axios.get(fullUrl)
      .then(response => {
        res.send(response.data); 
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        res.status(500).send('Error retrieving data'); // Handle errors gracefully
      });
  } else {
    res.send('GET request received!');
    console.log('not valid URL');
  }
});




app.listen(PORT, () => { 
    console.log(`${PROJECT} API version ${VERSION} is listening on port ${IP}:${PORT}      ${serverStartTime} `); 
});
