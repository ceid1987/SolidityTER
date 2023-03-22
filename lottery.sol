pragma solidity ^0.8.0;

contract Lottery {

    // declaring variables 

    address public owner;
    uint256 public jackpot;
    address payable[] public players;

    // declaring constructor

    constructor() public {
        // owner to the address that deploys the contract
        owner = msg.sender;
    }

    // declaring events
    event PlayerEntered(address indexed player, uint256 amount, string message);
    event WinnerChosen(address indexed winner, uint256 amount, string message);

    function enter() public payable {
        require(msg.value > 0, "You must enter with a positive amount.");
        players.push(payable(msg.sender));
        jackpot += msg.value;

    // emit event with message
    emit PlayerEntered(msg.sender, msg.value, "Player has entered the lottery.");

    }

    // catch plain ether transaction
    receive() external payable {
        enter();
    }



    function randomWinner() public {
        require(msg.sender == owner, "Only the owner can pick a winner.");
        require(players.length > 0, "There are no players to pick a winner from.");

        uint256 randomIndex = uint256(keccak256(abi.encodePacked(block.timestamp, players))) % players.length;
        address payable winner = players[randomIndex];

        winner.transfer(jackpot);
        players = new address payable[](0);
        jackpot = 0;

        // emit event with custom message
        emit WinnerChosen(winner, jackpot, "Winner has been chosen.");
    }
}