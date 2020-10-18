import jwt from 'jsonwebtoken';
import config from '../../config/env/index.js';
import APIError from '../services/error.js';
import User from '../models/User.js';

export async function checkToken(req, res, next) {
  try {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    if (token) {
      jwt.verify(token, config.JWT_SECRET, async (err, decoded) => {
        if (err) {
          apiResponse.expiredAuthResponse(res, 'Token is invalid, Please refresh token or Authenticate again');
        } else {
          const user = await User.findById(decoded._id);
          req.User = user;
          next();
        }
      });
    } else {
      apiResponse.unauthorizedResponse(res, 'Token Missing, Please check headers or Authenticate to obtain new token');
    }
  } catch (err) {
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, true, err));
  }
}

export default checkToken;