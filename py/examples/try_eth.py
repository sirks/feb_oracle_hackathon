import time
from ethereum.abi import json_decode
from web3 import Web3, HTTPProvider, personal
from web3.contract import ConciseContract

# web3.py instance
from py.examples.settings import contract_abi

w3 = Web3(HTTPProvider('http://localhost:8545'))
# w3.personal.unlockAccount(w3.eth.accounts[0], "123456", 1000)

# Instantiate and deploy contract

contract = w3.eth.contract(
	json_decode(contract_abi),
	"0x6d1fa96c1775ea00995a61222fce3e5ae5a356f8",
)

# Getters + Setters for web3.eth.contract object
print('Contract value: {}'.format(contract.call().getString()))
contract.transact({'from': w3.eth.accounts[0]}).callBack('Nihaoi')
print('Setting value to: Nihaoi')
print('Contract value: {}'.format(contract.call().getString()))


def query_callback(p1):
	print(p1)


# query_filter = w3.eth.filter({
# 	'fromBlock': 0,
# 	'toBlock': 'latest',
# 	# 'address': "0x22983a0b962b217b2bdc36b65571caf8446b2dac",
# })
query_filter = contract.on('Query')
query_filter.watch(query_callback)

contract.transact({'from': w3.eth.accounts[0]}).fireTestEvent()

time.sleep(100)
