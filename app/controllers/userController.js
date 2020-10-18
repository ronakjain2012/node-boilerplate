import APIError from '../services/error.js';
import User from '../models/User.js';

export async function register(req, res, next) {
  try {
    const user = await User.create(req.body);
    apiResponse.successResponseWithData(
      res,
      'User Successfully Created.',
      user.toJSON(),
    );
  } catch (err) {
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, true, err));
  }
}

export async function login(req, res, next) {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) apiResponse.ErrorResponse(res, 'invalid credentials.');
    if (user.authenticateUser(req.body.password)) {
      apiResponse.successRawResponse(res, {
        ...user.toAuthJSON(),
        ...user.toJSON(),
      });
    } else {
      apiResponse.ErrorResponse(res, 'invalid credentials.');
    }
  } catch (err) {
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, true, err));
  }
}

export async function index(req, res, next) {
  try {
    const users = await req.paginationProcess(User.find());
    apiResponse.successResponseWithData(res, 'Users', users);
  } catch (err) {
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, true, err));
  }
}
