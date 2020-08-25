const statusConst = require('../constants/status');
const _ = require('lodash');

module.exports = {
  stringFormat(str) {
    var args = [].slice.call(arguments, 1),
      i = 0;

    return str.replace(/%s/g, () => args[i++]);
  },
  frmRes(status, code, msg, data) {
    let _msg = '';
    if(status !== statusConst.SUCCESS && status !== statusConst.OK){
      if (msg) {
        if (msg.stack)
          _msg = msg.stack;
        else if (msg.message)
          _msg = msg.message;
        else if (msg)
          _msg = msg;
      }
    }

    if (data === '') {
      data = {};
    }

    let success = status === statusConst.SUCCESS || status === statusConst.OK;

    let json = { 
      status: success ? statusConst.SUCCESS : statusConst.FAIL,
      err: {
        err_code: code,
        err_msg: _msg,
      }
    };

    if (success) {
      json.msg = msg;
      json.data = data;
    } else {
      json.err.err_details = data;
      json.data = null;
    }

    return JSON.stringify(json, null, 4);

  },
};