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
const { createClient } = require('@supabase/supabase-js');


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
app.use(bodyParser.json());
app.use(cors());  

const logRequestAndCaptureData = async (req, res, next) => {

  const visitorData = {
    method: req.method,
    url: req.url,
    IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    userAgent: req.headers['user-agent'],
  };
console.log(visitorData);
};

app.use(logRequestAndCaptureData);

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
