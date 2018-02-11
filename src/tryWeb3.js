const fs = require('fs');
const Web3 = require('web3');

var abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "testString",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "queryString",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "oracleAddress",
                "type": "address"
            }
        ],
        "name": "Query",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "fireTestEvent",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "queryString",
                "type": "string"
            },
            {
                "name": "oracleAddress",
                "type": "address"
            }
        ],
        "name": "fireEvent",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "response",
                "type": "string"
            }
        ],
        "name": "callBack",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getString",
        "outputs": [
            {
                "name": "_testString",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
const web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8545"));
const eth = web3.eth;
var contract = new eth.Contract(abi, "0x43fb05b642a784c882a59914cdab572aeb04a953");


// const subscribtion = eth.subscribe("logs",
//     {address: "0xc682011d182013ec94169858181838822dcc570f"},
//     (err, res) => console.log(err, res)
// );
// var event = clientReceipt.Deposit();

// watch for changes
// event.watch(function(error, result){
//     // result will contain various information
//     // including the argumets given to the `Deposit`
//     // call.
//     if (!error)
//         console.log(result);
// });

// Or pass a callback to start watching immediately
function callback(q) {
    console.log(q);
}

let event = contract.events.Query().on("data", callback);

// (function (error, result) {
//     if (!error)
//         console.log(result);
// });

contract.methods.fireTestEvent().send({from: "0x2592a882499edf8897256f95c2c50d689ce2657b"});

// setTimeout(() => console.log("done"), 5000);