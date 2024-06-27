const express = require('express'); // Import express library
const router = express.Router(); // Create a router object
const { createClient } = require('@supabase/supabase-js');


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
// Function to capture visitor data
function captureVisitorData(req) {
  return {
    status: res.statusCode,
    url: req.originalUrl,
    IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    request_body: req.body,
    request_method: req.method,
    lat: req.headers['x-vercel-ip-latitude'],
    lon: req.headers['x-vercel-ip-longitude'],
    city: req.headers['x-vercel-ip-city'],
    region: req.headers['x-vercel-ip-country-region'],
    country: req.headers['x-vercel-ip-country'],
    UA: req.headers['user-agent'],
    date_time: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
  };
}

// Supabase connection (replace with your Supabase initialization)
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Router middleware to capture data on all requests
router.use((req, res, next) => {
  const visitordata = captureVisitorData(req);
  console.log(visitordata);

  supabase
    .from('gpsdatatest')
    .insert([visitordata])
    .then(response1 => {
      console.log('Data sent to Supabase successfully:', response1);
    })
    .catch(error1 => {
      console.error('Error sending data to Supabase:', error1);
    });

  next(); // Pass control to the next middleware
});

// Example route handler (you can add more routes)
router.get('/', (req, res) => {
  // Your route logic here
  res.send('Hello from the visitor data router!');
});

module.exports = router;
