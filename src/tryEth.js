const HttpProvider = require('ethjs-provider-http');
const Eth = require('ethjs-query');
const EthContract = require('ethjs-contract');
const eth = new Eth(new HttpProvider('http://localhost:8545'));
const contract = new EthContract(eth);

const SimpleStore = contract(abi, bytecode, defaultTxObject);
const simpleStore = SimpleStore.at('0x000...');
// const simpleStore = SimpleStore.new((error, result) => {
    // result null '0x928sdfk...'
// });

simpleStore.set(45000, (error, result) => {
    // result null '0x2dfj24...'
});

simpleStore.get().catch((error) => {
    // error null
}).then(result => {
    // result <BigNumber ...>
});

const filter = simpleStore.SetComplete();
filter.new({ toBlock: 'latest' }, (error, result) => {
    // result null <BigNumber ...> filterId
});
filter.watch((err, result) => {
    // result null FilterResult {...}
});
filter.uninstall()
    .then(result => {
    // result Boolean
});