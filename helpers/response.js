const statusConst = require('../constants/status');
const errConst = require('../constants/error')
const formatHelper = require('../helpers/format');
const _ = require('lodash');

module.exports = {
  successRes: async (res, msg, data) => {
    try {
      let statusCode = statusConst.SUCCESS;

      return sendJSON(res)
        .status(statusConst.OK.code)
        .send(formatHelper.frmRes(statusCode, null, msg, data));
    } catch (error) {
      throw error;
    }
  },
  notFoundRes: async (res, not_foung_msg, data) => {
    try {
      sendReqWithStatusCode(res, statusConst.NOT_FOUND, not_foung_msg, data);
    } catch (error) {
      throw error;
    }
  },
  badRequestRes: async (res, bad_request_msg, data) => {
    try {
      sendReqWithStatusCode(res, statusConst.BAD_REQUEST, bad_request_msg, data);
    } catch (error) {
      throw error;
    }
  },
  internalServerErrRes: async (res, err_msg, data) => {
    try {
      sendReqWithStatusCode(res, statusConst.INTERNAL_SERVER_ERROR, err_msg, data);
    } catch (error) {
      throw error;
    }
  },
  unauthorizedErrRes: async (res, err_msg, data) => {
    try {
      const unauthorized = errConst.ERR_CUSTOM_UNAUTHORIZED
      let _data = { ...data, code: unauthorized.code }
      sendReqWithStatusCode(res, statusConst.UNAUTHORIZED, err_msg, _data);
    } catch (error) {
      throw error;
    }
  },
  forbiddenErrRes: async (res, err_msg, data) => {
    try {
      const forbidden = errConst.ERR_FORBIDDEN
      let _data = { ...data, code: forbidden.code }
      sendReqWithStatusCode(res, statusConst.FORBIDDEN, err_msg, _data);
    } catch (error) {
      throw error;
    }
  },
  sendReqWithStatusCode(res, status, err_msg, data) {
    return sendReqWithStatusCode(res, status, err_msg, data)
  },
  getHttpStatusCode(err) {
    return getHttpStatusCode(err);
  },
};
function sendJSON(res) {
  return res.header("Content-Type", "application/json; charset=utf-8");
}

function sendReqWithStatusCode(res, status, err_msg, data) {
  try {
    let statusCode = status;
    let httpStatusCode = getHttpStatusCode(status);

    return sendJSON(res)
      .status(httpStatusCode)
      .send(formatHelper.frmRes(statusCode, status.code, err_msg, data));
  } catch (error) {
    throw error;
  }
}

function getHttpStatusCode(err) {
  let code;
  if (!err)
    code = statusConst.OK.code;
  else {
    let found = Object.values(statusConst).find(value => _.isEqual(value, err));
    if (found) return _.get(found, 'code') || 500;
    switch (err.code) {
      case errConst.ERR_CUSTOM_LOG_NOT_FOUND.code:
        code = statusConst.FORBIDDEN.code;
        break;
      case errConst.ERR_CUSTOM_INVALID_QUERY_PARAMS.code:
        code = statusConst.BAD_REQUEST.code;
        break;
      case errConst.ERR_CUSTOM_INVALID_INPUT.code:
        code = statusConst.BAD_REQUEST.code;
        break;
      case errConst.ERR_CUSTOM_NOT_ALLOW_CALL.code:
        code = statusConst.FORBIDDEN.code;
        break;
      case errConst.ERR_CUSTOM_INVALID_ACCESS.code:
        code = statusConst.UNAUTHORIZED.code;
        break;
      case errConst.ERR_CUSTOM_UNAUTHORIZED.code:
        code = statusConst.UNAUTHORIZED.code;
        break;
      case errConst.ERR_FORBIDDEN.code:
        code = statusConst.FORBIDDEN.code;
        break;
      default:
        code = statusConst.INTERNAL_SERVER_ERROR.code;
    }
  }
  return code;
}