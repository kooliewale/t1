import { URL } from 'url';
import { fetchDataFromPNRServer } from './pnrService';
import {fetchDataFromLiveTrainServer} from './liveTrain';

import {fetchTrainInfo,fetchTrainRoute} from './baseInfo';

// Route handler for '/getPNRinfo'
export async function handleGetPNRInfo(c) {
  const pnr = c.req.query('pnr');

  if (isValidPNR(pnr)) {
    try {
      const responseData = await fetchDataFromPNRServer(pnr);
      return c.json({ pnr: pnr, data: responseData });
    } catch (error) {
      console.error('Error:', error.message);
      return c.json({ error: error.message });
    }
  } else {
    return c.json({ error: 'Invalid PNR format or length' });
  }
}

// Function to check if PNR is valid (length 10)
function isValidPNR(pnr) {
  return pnr && pnr.length === 10;
}


//  For handling Live Train

export async function handleLiveTrain(c) {
  try {
    const trainNo = c.req.query('trainNo');
    const date = c.req.query('date');

    if (!trainNo) {
      return c.json({ error: 'Train number is required' });
    }

    // Perform any additional validation or processing here if needed
    // Call fetchDataFromLiveTrainServer to get data
    const responseData = await fetchDataFromLiveTrainServer(trainNo, date);

    // Return the fetched data along with trainNo and date
    return c.json({ trainNo: trainNo, date: date || null, data: responseData });
  } catch (error) {
    console.error('Error handling live train request:', error.message);
    return c.json({ error: 'Failed to process request' });
  }
}


//  To handle Train Info




export async function handleTrainInfo(c) {
  try {
    const trainNo = c.req.query('trainNo');

    if (!trainNo) {
      return c.json({ error: 'Train number is required' });
    }

    // Perform any additional validation or processing here if needed
    // Call fetchDataFromLiveTrainServer to get data
    const responseData = await fetchTrainInfo(trainNo);

    // Return the fetched data along with trainNo and date
    return c.json({ trainNo: trainNo, data: responseData });
  } catch (error) {
    console.error('Error handling train request:', error.message);
    return c.json({ error: 'Failed to process request' });
  }
}

// hanlde train ROute 

export async function handleRoute(c) {
  try {
    const trainNo = c.req.query('trainNo');

    if (!trainNo) {
      return c.json({ error: 'Train number is required' });
    }

    // Perform any additional validation or processing here if needed
    // Call fetchDataFromLiveTrainServer to get data
    const responseData = await fetchTrainRoute(trainNo);

    // Return the fetched data along with trainNo and date
    return c.json({ trainNo: trainNo, data: responseData });
  } catch (error) {
    console.error('Error handling train request:', error.message);
    return c.json({ error: 'Failed to process request' });
  }
}
