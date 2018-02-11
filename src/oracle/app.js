const getData = require('./weatherData');
const initDaemon = require('./oracle_daemon');
const settings = require('./settings');

const daemon = initDaemon(getData);

daemon.getContractString();
daemon.triggerContractQuery("25544", settings.oracleAddress);
setTimeout(
    async () => await daemon.getContractString(),
    1000
);
