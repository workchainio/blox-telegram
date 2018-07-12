const Winston = require('winston');

const log = Winston.createLogger({
    level: 'info',
    format: Winston.format.json(),
    transports: [
      new Winston.transports.File({ filename: 'info.log'})
    ]
  });

module.exports = log;