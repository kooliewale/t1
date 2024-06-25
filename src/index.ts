// app.js or where you configure your server

import { Hono } from 'hono';
import { handleGetPNRInfo, handleLiveTrain,handleRoute,handleTrainInfo } from './routes';

const app = new Hono();

// Define routes
app.all('/getPNRinfo', handleGetPNRInfo);
app.all('/liveTrainInfo', handleLiveTrain);


app.all('/getRoute',handleRoute);
app.all('/getTrainInfo',handleTrainInfo);


export default app;
