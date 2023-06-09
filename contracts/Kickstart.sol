// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract KickStarter {
    address payable owner;

    uint targetValue;
    bool private isOpen;
    bool targetReached;

    struct Donation {
        string name;
        address senderAdress;
        uint donationAmmount;
    }

    modifier whileOpen() {
        require(isOpen);
        _;
    }

    Donation[] donations;

    event TargetReached();
    event DonationReceived(string name, uint value);

    constructor(uint _targetValue) {
        require(_targetValue > 0);
        targetValue = _targetValue;
        owner = payable(msg.sender);
        isOpen = true;
        targetReached = false;
    }

    function isTargetReached() public view returns (bool) {
        return targetReached;
    }

    function deposit(string calldata name) external payable whileOpen {
        donations.push(
            Donation({
                name: name,
                senderAdress: msg.sender,
                donationAmmount: msg.value
            })
        );

        emit DonationReceived(name, msg.value);

        if (address(this).balance >= targetValue) {
            cashOut();
        }
    }

    function getTotalDonations() external view returns (uint) {
        return donations.length;
    }

    function getAccumulated() public view returns (uint) {
        return address(this).balance;
    }

    function computeRemaining() public view returns (uint) {
        return targetValue - address(this).balance;
    }

    function cashOut() internal {
        isOpen = false;
        targetReached = true;
        owner.transfer(address(this).balance);
        emit TargetReached();
    }

    receive() external payable {}

    fallback() external payable {}
}
