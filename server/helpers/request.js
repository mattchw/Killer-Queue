const format = require('./format');

module.exports = {
    logMsg: (req, level, message) => {
        let reqInfo = `${req.method} ${req.url} HTTP/${req.httpVersion} | %s`;
        switch (level) {
            case "debug":
                return req.log.debug(format.stringFormat(reqInfo, message));
            case "info":
                return req.log.info(format.stringFormat(reqInfo, message));
            default:
                return req.log.info(format.stringFormat(reqInfo, message));
        }
    }
};