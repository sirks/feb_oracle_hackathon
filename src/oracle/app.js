const getData = require('./weatherData');
const initDaemon = require('./oracle_daemon');
const settings = require('./settings');

const daemon = initDaemon(getData);

(async () => console.log(await daemon.getContractString()))()
    .catch(console.error);
daemon.triggerContractQuery("25544", settings.oracleAddress);
setTimeout(
    async () => console.log(await daemon.getContractString()),
    1000
);
