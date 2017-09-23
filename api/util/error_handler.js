var exports = module.exports = {};

exports.errorJSON = (url, err, msg) => {
    msg = (typeof msg !== 'undefined') ? msg : 'Internal Server Error.';
    return {
        url: url,
        error: err,
        message: msg
    };
};