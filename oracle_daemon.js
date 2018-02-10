// Load Ethereum
const Eth = require('ethjs');
const EthFilter = require('ethjs-filter');
const fs = require('fs');
const privateToAccount = require('ethjs-account').privateToAccount;//ethjs module for handling ethereum accounts
const provider = 'http://127.0.0.1:8545';//address of node

const eth = new Eth(new Eth.HttpProvider(provider));
// const filters = new Eth.EthFilter(eth);

/*
provider account
*/

//add ethereum private key(must have test ether. can export from metamask or myetherwallet. for public testnet, rinkeby faucet at https://www.rinkeby.io/#faucet)
const privateKeyString = "3e0b41c5ffa0149a809be24ba4326f0bfe21431ccffb36421ab4ad0ca79c9311";

//create account object from private key string
const account = privateToAccount(privateKeyString);

/*
contract
*/

//load contract interface file
const eventEmitterFile = fs.readFileSync("event_emitter_abi.json");

//parse interface text to json object
const emitterAbi = JSON.parse(eventEmitterFile);

//contract address(deployed to rinkeby testnet)
const emitterAddress = "0x0e1b4a51d661a0d683f9a0559baccc25787fa122";

//instantiate contract object
const eventEmitterContract = eth.contract(emitterAbi).at(emitterAddress);

//make contract fire desired query with oracleAddress
function triggerContractQuery(queryString, oracleAddress, accountAddress) {

    //call contract fireEvent method
    eventEmitterContract.fireTestEvent({from: accountAddress})
        .then((success) => {
            // eventEmitterContract.fireEvent(queryString, oracleAddress, {from: accountAddress}).then((success) => {
            console.log(null, success);
        })
        .catch((err) => {
            console.log(err);
        });
}

//respond to contract query
function respondContractQuery(responseString, accountAddress) {

    //call contract callback method
    eventEmitterContract.callBack(responseString, {from: accountAddress}).then((success) => {
        console.log(null, success);

    }).catch((err) => {
        console.log(err);
    });

}

/*
Handle Query events from EventEmitter contract
event Query(string queryString, address queryAddress);
*/

// Create the Event filter for solidity event
// let filter = eventEmitterContract.Query();
// filter = filter.new((err, res) => {
//         if (err) {
//             throw err;
//         }
//     });
//     .then((result) => {
//         console.log("contract is calling me with ", result);
//         respondContractQuery("changed text", account.address);
//     })
//     .catch((err) => {
//         console.log(err);
// });

// Watch the event filter
const watcher = eventEmitterContract.Query().watch((err, result) => {
    console.log("contract is calling me with ", err, result);
    respondContractQuery("changed text", account.address);
});

triggerContractQuery("tadaa", "0xaaaa5d90EC8aEb7419cbE4359C1d2c0157849547", account.address);

// triggerContractQuery("tadaa", "0xaaaa5d90EC8aEb7419cbE4359C1d2c0157849547", account.address);
