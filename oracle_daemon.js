// Load Ethereum
const Web3 = require('web3');
const request = require('request');
const provider = 'ws://localhost:8545';

const web3 = new Web3(new Web3.providers.WebsocketProvider(provider));
const eth = web3.eth;

const ORACLE_ADDRESS = "0x8cC628f5492Ca0ceF7918E5BF9554800C4d01760";
/*
provider account
*/

//create account object from private key string
const account_number = "0x52471e1e568ef5ad8f88c5f0b806ef5a258d0434";

/*
contract
*/

//load contract interface file
const eventEmitterFile = fs.readFileSync("event_emitter_abi.json");

//parse interface text to json object
const emitterAbi = JSON.parse(eventEmitterFile);

//contract address(deployed to rinkeby testnet)
const emitterAddress = "0x2ace0e7f9108ac9264b5de37ed7d50a749d64f9f";

//instantiate contract object
const eventEmitterContract = new eth.Contract(emitterAbi, emitterAddress);

//make contract fire desired query with oracleAddress
function triggerContractQuery(queryString, oracleAddress){

    //call contract fireEvent method
    eventEmitterContract.methods.fireEvent(queryString, oracleAddress)
        .send({from: account_number})
}

//respond to contract query
function respondContractQuery(responseString){

    //call contract callback method
    eventEmitterContract.methods.callBack(responseString)
        .send({from: account_number})
}

function getContractString() {
    eventEmitterContract.methods.getString()
        .call({from: account_number})
        .then((res) => {
            console.log(`contract string = ${res}`);
        })
        .catch((err) => console.error(err))
}

// getContractString();

/*
Handle Query events from EventEmitter contract
event Query(string queryString, address queryAddress);
*/

eventEmitterContract.events.Query().on("data", callback);

function callback(query) {
    if (query.returnValues.oracleAddress !== ORACLE_ADDRESS){
        return;
    }
    const queryString = query.returnValues.queryString;
    console.log(`queryString = ${queryString}`);
    getData(queryString)
}

function getData(query) {
    request(`https://api.wheretheiss.at/v1/satellites/${query}`,
        (error, res, body) => {
            if (!res || res.statusCode >= 300) {
                console.error("could not get resp");
                return;
            }
            const altitude = JSON.parse(body).altitude.toString();
            console.log(altitude);
            // updateContract(altitude);
        });
}

function updateContract(altitude) {
    respondContractQuery(altitude);
    getContractString();
}

triggerContractQuery("25544", ORACLE_ADDRESS);
