import { activityLog } from '@/bus';
import httpStatus from 'http-status';
import express from 'express';
import APIError from '@/apiError';

const router = express.Router();

router.get('/test', (req, res, next) => {
  try {
    res.json({ status: 'OK' }).end();
    activityLog(null, { eventId: req.id, eventName: 'TEST-ROUTE', message: 'Test route hit', type: 'info' });
  } catch (err) {
    console.log(err.stack);
    next(new APIError(httpStatus.INTERNAL_SERVER_ERROR, err.message, err, true));
  }
});

export default router;
