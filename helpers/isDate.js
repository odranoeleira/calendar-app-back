const moment = require("moment");

/**
 * custom validator  , { req, location, path }
 * @param {*} value
 * @param {*} param1
 * @returns
 */
const isDate = (value) => {
  if (!value) {
    return false;
  }
  const date = moment(value);
  if (date.isValid()) return true;
  else return false;
};

module.exports = { isDate };
