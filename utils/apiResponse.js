export function successResponse(res, msg) {
  const data = {
    status: 1,
    message: msg,
  };
  return res.status(200).json(data);
}

export function successResponseWithData(res, msg, data) {
  const resData = {
    status: 1,
    message: msg,
    data,
  };
  return res.status(200).json(resData);
}

export function ErrorResponse(res, msg) {
  const data = {
    status: 0,
    message: msg,
  };
  return res.status(500).json(data);
}

export function notFoundResponse(res, msg) {
  const data = {
    status: 0,
    message: msg,
  };
  return res.status(404).json(data);
}

export function validationErrorWithData(res, msg, data) {
  const resData = {
    status: 0,
    message: msg,
    data,
  };
  return res.status(400).json(resData);
}

export function unauthorizedResponse(res, msg) {
  const data = {
    status: 0,
    message: msg,
  };
  return res.status(401).json(data);
}
