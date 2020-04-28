pragma solidity ^0.5.0;

import "./SafeMath.sol";
import "./EscrowRole.sol";
import "./AionRole.sol";

contract Protected is EscrowRole, AionRole {
  using SafeMath for uint256;

   uint256 public protectionPeriod;
   mapping (address => uint256) public protectedTokens;
   event TransferChecked(string message);
   event MSGSenderProtected(string message0, uint256 num, string message1, uint _amount, bool amountToSendGreaterThanZero);
   event CheckRequire(uint _amount, uint256 _protectedTokens, bool lessThanProtected);
   event Caller(address sender);
   
    constructor (uint256 _protectionPeriod) public {
        protectionPeriod = _protectionPeriod;
    }

    modifier checkProtectedTokens (uint256 amount) {
      if (protectedTokens[msg.sender] > 0) {
        require (amount < protectedTokens[msg.sender], "your tokens are under protection period, check timeToLiftProtection() for time until you have tokens available, and/or check amountProtected to see how many of your tokens are currently under the protection period" );
      }
      _;
    }
    
    function timeProtectTokens(address _address, uint256 _amount) public onlyEscrowRole returns (bool) {
      protectedTokens[_address] = protectedTokens[_address].add(_amount);
     // return true;
    }
 
    function removeTokenProtection(address _address, uint256 _amount) public onlyAionRole returns (bool) {
      emit Caller(msg.sender);
      protectedTokens[_address] = protectedTokens[_address].sub(_amount);
      //return true;
    }

    function amountProtected (address _address) public view returns (uint256) {
     return protectedTokens[_address];
   }


}
