const getData = require('./IssData');
const initDaemon = require('./oracle_daemon');
const settings = require('./settings');

const daemon = initDaemon(getData);

daemon.getContractString();
// daemon.triggerContractQuery("25544", settings.oracleAddress);
setTimeout(
    () => daemon.triggerContractQuery("25544", settings.oracleAddress),
    500
);

setTimeout(
    daemon.getContractString,
    2000
);