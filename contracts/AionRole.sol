pragma solidity ^0.5.0;

import "./Context.sol";
import "./Roles.sol";

contract AionRole is Context {
    using Roles for Roles.Role;

    event AionAddressAdded(address indexed aionAddr);

    Roles.Role private _aionAddress;

    constructor () internal {
    }

    modifier onlyAionRole() {
        require(isAionAddress(msg.sender), "Aion Role: caller does not have the Aion role");
        _;
    }

    function isAionAddress(address account) public view returns (bool) {
        return _aionAddress.has(account);
    }

    function _addAionAddress(address aionAddress) internal {
        _aionAddress.add(aionAddress);
        emit AionAddressAdded(aionAddress);
    }
}


