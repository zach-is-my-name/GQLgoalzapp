pragma solidity ^0.5.0; 

import "./SafeMath.sol";


contract Restricted {
  using SafeMath for uint256;
  
  mapping (address => uint256) restrictedTokens;
  mapping (address => address) initializedEscrows;

  event Amount(uint256 amount);
  event RestrictedTokens(uint256 restrictedTokenAmount);
  event ExceedsRestricted(uint256 exceedsRestrictedAmount);

  modifier checkRestrictedTokens (uint amount, address recipient) {
    if (restrictedTokens[msg.sender] > amount && recipient != initializedEscrows[recipient]) {
      emit Amount(amount);
      emit RestrictedTokens(restrictedTokens[msg.sender]);
// bad: event SafeMath reverts: overflow, if 'amount <  restricted tokens      emit ExceedsRestricted(amount.sub(restrictedTokens[msg.sender]));
      require(amount < restrictedTokens[msg.sender], "Transfer failed: restricted tokens exceeds transfer amount. Try again, using less than Amount Restricted");
    }
   _; 
  }

  function setInitializedEscrow(address _escrowAddress) external returns (bool) {
    initializedEscrows[_escrowAddress] = _escrowAddress;
  }

  function setRestrictedTokens (address _tokenMintRecipient, uint256 _amount) internal {
    restrictedTokens[_tokenMintRecipient] = restrictedTokens[_tokenMintRecipient].add(_amount);
  }

  function unsetRestrictedTokens (address _tokenDepositor, uint _amount) internal {
    restrictedTokens[_tokenDepositor] = restrictedTokens[_tokenDepositor].sub(_amount);
  } 

  function amountRestricted(address _account) public view returns (uint256) {
    return restrictedTokens[_account];
  }
}

 








