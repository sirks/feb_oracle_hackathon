const Web3 = require('web3');
const fs = require('fs');
const settings = require('./settings');
const web3 = new Web3(new Web3.providers.WebsocketProvider(settings.provider));
const eth = web3.eth;

//load contract interface file
const eventEmitterFile = fs.readFileSync("event_emitter_abi.json");

//parse interface text to json object
const emitterAbi = JSON.parse(eventEmitterFile);

//instantiate contract object
const eventEmitterContract = new eth.Contract(emitterAbi, settings.emitterAddress);

const defaultOptions = {from: settings.accountNumber, gas: settings.gasLimit};

function triggerContractQuery(queryString, oracleAddress) {
    return eventEmitterContract.methods.fireEvent(queryString, oracleAddress).send(defaultOptions)
}

function respondContractQuery(responseString) {
    return eventEmitterContract.methods.callBack(responseString).send(defaultOptions)
}

function getContractString() {
    return eventEmitterContract.methods.getString().call(defaultOptions)
}

function buildCallback(getData) {
    return async (query) => {
        if (query.returnValues.oracleAddress !== settings.oracleAddress) {
            return;
        }
        const queryString = query.returnValues.queryString;
        const data = await getData(queryString);
        respondContractQuery(data);
    }
}

function initDaemon(getData) {
    eventEmitterContract.events.Query()
        .on("data", buildCallback(getData));

    return {
        triggerContractQuery,
        getContractString
    }
}

module.exports = initDaemon;