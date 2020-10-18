import jwt from 'jsonwebtoken';
import config from '../../config/env/index.js';
import HTTPStatus from 'http-status';
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
            apiResponse.expiredAuthResponse(res, 'invalid token.');
        } else {
        const user = await User.findById(decoded._id);
          req.User = user;
          next();
        }
      });
    } else {
        apiResponse.unauthorizedResponse(res, 'invalid credentials.');
    }
  } catch (err) {
    next(
      new APIError(
        'Sorry, Token Missing.',
        HTTPStatus.INTERNAL_SERVER_ERROR,
        true,
      ),
    );
  }
}

export default checkToken;