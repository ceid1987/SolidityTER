
![Logo](https://www.upssitech.eu/wp-content/uploads/2016/12/logo_upssitech.png)
#

# Solidity TER

This repo is part of a research project for Blockchain and Smart Contracts. 




## Usage

To deploy and test the smart contracts in this repo, use the [remix IDE](https://remix.ethereum.org/).

## The Lottery

Once deployed, players can enter the lottery with a set amount of ethereum (or other denominations of eth such as wei).

A winner is then randomly determined by different methods (see ) and the jackpot is transferred to them. 

## v1

In this version, a random winner is determined by a randomly generated index using the `keccak256` hash function, the current `block.timestamp` and the `players` array. The `randomIndex` is then used to select a winner from the `players` array and the jackpot is transferred to the winner. 

Since it relies on the `block.timestamp`, this method of determining a winner is controlled by the contract and is therefore not truly random. 

## v2

In this version, a random winner is determined by using an offchain oracle (in this case [ChainlinkVRF](https://chain.link/vrf)) that will provide a truly random number for the contract to use to determine the winner. 

Note that you will have to setup your own [ChainlinkVRF subscription](https://vrf.chain.link/goerli/new) in order to test this version of the lottery. 


