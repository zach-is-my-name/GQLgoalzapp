const helper = require('ganache-time-traveler');
const { BN, constants, expectEvent, expectRevert } = require('../client/node_modules/openzeppelin-test-helpers');
const { expect } = require('chai');
const { ZERO_ADDRESS } = constants;
const { advanceTimeAndBlock } = require("./advance_time_and_block.js");

const GoalEscrowTestVersion = artifacts.require('GoalEscrowTestVersion');
const GoalZappTokenSystem = artifacts.require('GoalZappTokenSystem');
const ProxyFactory = artifacts.require('ProxyFactory');
const GoalZappBondingCurve = artifacts.require('GoalZappBondingCurve'); 
const Proxy = artifacts.require('Proxy');

const initialSupply  = new BN(web3.utils.toWei("128")); 
const startPoolBalance = new BN(web3.utils.toWei(".03359789")) 
const suggestionDuration = new BN(10);
const protectionPeriod = new BN(30); 

const ownerBondDepositAmount = new BN(10);
const suggesterBondAmount = new BN(5);
const rewardDepositAmount = new BN(10); 
const totalAmountOwnerDeposit = new BN(20); 

const id = web3.utils.utf8ToHex('cjorlslvv0fcz01119bgpvvmr')

const two = new BN(2);
const twoFiveSix = new BN(256);
const one = new BN(1);
const MAX_UINT256 = (two.pow(twoFiveSix)).isub(one); 

contract('Escrow', function([master, owner, suggester]) {


  beforeEach(async function() {
    this.tokenSystem = await GoalZappTokenSystem.new();
    await this.tokenSystem.initialize({value: startPoolBalance, from: master});
    await this.tokenSystem.transfer(owner, initialSupply, {from: master}); 
    this.implementation = await GoalEscrowTestVersion.new();
    this.factory = await ProxyFactory.new(this.implementation.address)    
    let snapShot = await helper.takeSnapshot();
    snapshotId = snapShot['result'];  })

    shouldBehaveLikeGoalEscrow('GoalEscrowTestVersion', master, owner, suggester);
  })

afterEach(async() => {
   await helper.revertToSnapshot(snapshotId);
});
 

function shouldBehaveLikeGoalEscrow (errorPrefix, master, owner, suggester) {
  it('reverts when deployed with a null token address', async function() {
    this.GoalEscrow = await GoalEscrowTestVersion.new() 
    await expectRevert.unspecified(this.GoalEscrow.initMaster(ZERO_ADDRESS, 30, {from:master}));
  })

  describe('with token, with proxy', function () {
    describe('Create and Fund Escrow', function() {
      let proxyAddress; 
      beforeEach(async function () {
	await this.factory.build("Goal1", {from: owner});
	proxyAddress = await this.factory.getProxyAddress("Goal1", owner,{from:owner}); 
	this.proxiedEscrow = await GoalEscrowTestVersion.at(proxyAddress);
	await this.proxiedEscrow.initMaster(this.tokenSystem.address, 30, {from: master}); 
	})

      context('when not approved by payer', function () { 
	it('reverts on deposit', async function () {
	  await expectRevert.unspecified(
	   this.proxiedEscrow.newGoalInit(ownerBondDepositAmount,rewardDepositAmount, {from: owner})
	  );
	});
      });

      describe('when approved by payer', function () {
	beforeEach(async function () {
	  await this.tokenSystem.approve(this.proxiedEscrow.address, MAX_UINT256, { from: owner });
	  await this.proxiedEscrow.newGoalInit(ownerBondDepositAmount,rewardDepositAmount, {from: owner});
	});

	it('stores the token\'s address', async function () {
	  const address = await this.proxiedEscrow.token();
	  expect(address).to.be.equal(this.tokenSystem.address);
	});

	it('deposits bond and reward to contract', async function() {
	  expect(await this.tokenSystem.balanceOf(this.proxiedEscrow.address)).to.be.bignumber.equal(totalAmountOwnerDeposit);
	});

	it('adds to contract bondFunds', async function() {
	  expect(await this.proxiedEscrow.bondFunds()).to.be.bignumber.equal(ownerBondDepositAmount);
	});

	it('adds to contract rewardFunds', async function() {
	  expect(await this.proxiedEscrow.rewardFunds()).to.be.bignumber.equal(rewardDepositAmount)
	  });

  describe('depositOnSuggest', function () {
    beforeEach(async function () {
      await this.tokenSystem.approve(proxyAddress, MAX_UINT256, {from: suggester});
      await this.tokenSystem.transfer(suggester, 50, {from: owner}); 
      await this.proxiedEscrow.depositOnSuggestTestVersion(id, suggesterBondAmount, this.proxiedEscrow.address, {from: suggester}); 
    });

    it('deposits suggester bond amount', async function() {
      expect(await this.tokenSystem.balanceOf(this.proxiedEscrow.address)).to.be.bignumber.equal(totalAmountOwnerDeposit.add(suggesterBondAmount));
    })
    it('adds to suggesterBond', async function() {
      let _suggesterBond = (await this.proxiedEscrow.suggestedSteps(id)).suggesterBond;
      expect(_suggesterBond).to.be.bignumber.equal(suggesterBondAmount);
    })
    it('subtracts owner bond from bondFunds', async function() {
      expect(await this.proxiedEscrow.bondFunds()).to.be.bignumber.equal(ownerBondDepositAmount.isub(await this.proxiedEscrow.ownerBondAmount()));
    })
    it('adds ownerBondAmount to Suggester struct member ownerBond', async function() { 
      let _ownerBond = (await this.proxiedEscrow.suggestedSteps(id)).ownerBond;
      expect(_ownerBond).to.be.bignumber.equal(await this.proxiedEscrow.ownerBondAmount())
    })

    context('set suggestion timeout', function() {
      it('stores the current time in the Suggester struct', async function() {
        const {logs} = await this.proxiedEscrow.depositOnSuggestTestVersion(id, suggesterBondAmount, this.proxiedEscrow.address, {from: suggester});
        let _timeSuggested = (await this.proxiedEscrow.suggestedSteps(id)).timeSuggested
	expectEvent.inLogs(logs, 'TimeNow', {blocktime: _timeSuggested});      
      });
      
      it('stores the expiration time in the Suggester struct', async function() {
        const {logs} = await this.proxiedEscrow.depositOnSuggestTestVersion(id, suggesterBondAmount, this.proxiedEscrow.address, {from: suggester});
        let _suggestionExpires = (await this.proxiedEscrow.suggestedSteps(id)).suggestionExpires
	expectEvent.inLogs(logs, 'SuggestionExpires', {expires: _suggestionExpires});      
      });
    
  })


   context('returnBondsOnTimeOut()', function() {
    before(async function(){ 
//      await this.tokenSystem.approve(this.proxiedEscrow.address, MAX_UINT256, { from: owner });
//      await this.tokenSystem.approve(this.proxiedEscrow.address, MAX_UINT256, {from: suggester});
//      await this.tokenSystem.transfer(suggester, 50, {from: owner}); 
//      await this.proxiedEscrow.fundEscrow(ownerBondDepositAmount, rewardDepositAmount, {from: owner});
     // await this.proxiedEscrow.depositOnSuggestTestVersion(id, suggesterBondAmount, this.proxiedEscrow.address, {from: suggester}); 
    })
     it('transfers bond refund to suggester', async function() {
      let suggesterBalanceBeforeBondReturn = await this.tokenSystem.balanceOf(suggester)
// advance blockchain here
    await  advanceTimeAndBlock((await this.proxiedEscrow.suggestionDuration()).add(new BN (1)));
      await this.proxiedEscrow.returnBondsOnTimeOut(id); 
      expect(await this.tokenSystem.balanceOf(suggester)).to.be.bignumber.equal(suggesterBalanceBeforeBondReturn.add(suggesterBondAmount));
     }) 	    
     it('protects tokens', async function() {
    await  advanceTimeAndBlock((await this.proxiedEscrow.suggestionDuration()).add(new BN(1)));
      await this.proxiedEscrow.returnBondsOnTimeOut(id);
      expect(await this.tokenSystem.amountProtected(suggester)).to.be.bignumber.equal(suggesterBondAmount);
     })
     it('prevents transfer of protected tokens', async function() {
      await expectRevert.unspecified(this.tokenSystem.transfer(owner, 50, {from: suggester}))
     })
   })

   context('call getSuggestionDuration()', function() {
/*
    beforeEach(async function(){ 
      await this.tokenSystem.approve(this.proxiedEscrow.address, MAX_UINT256, { from: owner });
      await this.tokenSystem.approve(this.proxiedEscrow.address, MAX_UINT256, {from: suggester});
      await this.tokenSystem.transfer(suggester, 50, {from: owner}); 
      await this.proxiedEscrow.fundEscrow(ownerBondDepositAmount, rewardDepositAmount, {from: owner});
      await this.proxiedEscrow.depositOnSuggestTestVersion(id, suggesterBondAmount, this.proxiedEscrow.address, {from: suggester}); 
    })
*/
    it('gets the suggestion duration time', async function() {
    expect(await this.proxiedEscrow.getSuggestionDuration()).to.be.bignumber.equal(await this.proxiedEscrow.suggestionDuration())
    }) //replace to.be.equal --> to.be.bignumber.equal
   })

    context('call suggestionExpires()', function() {
/*
      beforeEach(async function(){ 
	await this.tokenSystem.approve(this.proxiedEscrow.address, MAX_UINT256, { from: owner });
	await this.tokenSystem.approve(this.proxiedEscrow.address, MAX_UINT256, {from: suggester});
	await this.tokenSystem.transfer(suggester, 50, {from: owner}); 
	await this.proxiedEscrow.fundEscrow(ownerBondDepositAmount, rewardDepositAmount, {from: owner});
	await this.proxiedEscrow.depositOnSuggestTestVersion(id, suggesterBondAmount, this.proxiedEscrow.address, {from: suggester}); 
      })
*/
      it('gets suggestion expiration (block)time', async function() {
        let _suggestionExpires = (await this.proxiedEscrow.suggestedSteps(id)).suggestionExpires
        let _timeSuggested = (await this.proxiedEscrow.suggestedSteps(id)).timeSuggested;
        expect(_suggestionExpires).to.be.bignumber.equal(_timeSuggested.add(await this.proxiedEscrow.suggestionDuration()));
      });
    })

    context('call suggesterBond()', function() {
/*
      beforeEach(async function(){ 
	await this.tokenSystem.approve(this.proxiedEscrow.address, MAX_UINT256, { from: owner });
	await this.tokenSystem.approve(this.proxiedEscrow.address, MAX_UINT256, {from: suggester});
	await this.tokenSystem.transfer(suggester, 50, {from: owner}); 
	await this.proxiedEscrow.fundEscrow(ownerBondDepositAmount, rewardDepositAmount, {from: owner});
	await this.proxiedEscrow.depositOnSuggestTestVersion(id, suggesterBondAmount, this.proxiedEscrow.address, {from: suggester}); 
      })
*/
      it('returns the suggester bond amount', async function() {	  
	expect(await this.proxiedEscrow.suggesterBond(id)).to.be.bignumber.equal(suggesterBondAmount);
	})
    }) 

   context('disburse on accept', function() {
/*
      beforeEach(async function(){ 
	await this.tokenSystem.approve(this.proxiedEscrow.address, MAX_UINT256, { from: owner });
	await this.tokenSystem.approve(this.proxiedEscrow.address, MAX_UINT256, {from: suggester});
	await this.tokenSystem.transfer(suggester, 50, {from: owner}); 
	await this.proxiedEscrow.fundEscrow(ownerBondDepositAmount, rewardDepositAmount, {from: owner});
	await this.proxiedEscrow.depositOnSuggestTestVersion(id, suggesterBondAmount, this.proxiedEscrow.address, {from: suggester}); 
      })
*/
      it('transfers bond to suggester', async function() {
	let suggesterBalanceBeforeBondReturn = await this.tokenSystem.balanceOf(suggester)
	await this.proxiedEscrow.disburseOnAccept(id, {from: owner});
	expect((await this.tokenSystem.balanceOf(suggester)).isub(await this.proxiedEscrow.rewardAmount())).to.be.bignumber.equal(suggesterBalanceBeforeBondReturn.add(suggesterBondAmount));
	})    
      it('pays reward to suggester', async function() {
	let suggesterBalanceBeforeBondReturn = await this.tokenSystem.balanceOf(suggester)
        let suggesterBalanceAfterBondReturn = suggesterBalanceBeforeBondReturn.iadd(suggesterBondAmount)
	await this.proxiedEscrow.disburseOnAccept(id, {from: owner});
	expect(await this.tokenSystem.balanceOf(suggester)).to.be.bignumber.equal(suggesterBalanceAfterBondReturn.iadd(await this.proxiedEscrow.rewardAmount()));
      })    
      it('transfers bond to owner', async function() {
	let ownerBalanceBeforeBondReturn = await this.tokenSystem.balanceOf(owner, {from: owner}); 
	await this.proxiedEscrow.disburseOnAccept(id, {from: owner});
        expect(await this.tokenSystem.balanceOf(owner)).to.be.bignumber.equal(ownerBalanceBeforeBondReturn.iadd(await this.proxiedEscrow.ownerBondAmount())); 	
      })	      
      it('protects suggester tokens', async function() {
	let suggesterBalanceBeforeReturn = await this.tokenSystem.balanceOf(suggester);
	await this.proxiedEscrow.disburseOnAccept(id, {from: owner});
        expect(await this.tokenSystem.balanceOf(suggester)).to.be.bignumber.equal(suggesterBalanceBeforeReturn.iadd(suggesterBondAmount).iadd(await this.proxiedEscrow.rewardAmount())); // before return 45 after 60
	await expectRevert.unspecified(this.tokenSystem.transfer(owner, 60, {from: suggester}));
      })
      it('protects owner tokens', async function() {
	let ownerBalanceBeforeReturn = await this.tokenSystem.balanceOf(owner);
	await this.proxiedEscrow.disburseOnAccept(id, {from: owner});
        expect(await this.tokenSystem.balanceOf(owner)).to.be.bignumber.equal(ownerBalanceBeforeReturn.iadd(await this.proxiedEscrow.rewardAmount())); // before return 30 after 40   
	await expectRevert.unspecified(this.tokenSystem.transfer(suggester, 40, {from: owner}));
      })
   }) 
   context('return bonds on reject', function() {
/*
    beforeEach(async function(){ 
      await this.tokenSystem.approve(this.proxiedEscrow.address, MAX_UINT256, { from: owner });
      await this.tokenSystem.approve(this.proxiedEscrow.address, MAX_UINT256, {from: suggester});
      await this.tokenSystem.transfer(suggester, 50, {from: owner}); 
      await this.proxiedEscrow.fundEscrow(ownerBondDepositAmount, rewardDepositAmount, {from: owner});
      await this.proxiedEscrow.depositOnSuggestTestVersion(id, suggesterBondAmount, this.proxiedEscrow.address, {from: suggester}); 
    }) 
*/
      it('refunds suggester bond', async function() {
	let suggesterBalanceBeforeReturnBond = await this.tokenSystem.balanceOf(suggester);
	await this.proxiedEscrow.returnBondsOnReject(id, {from: owner});
	expect(await this.tokenSystem.balanceOf(suggester)).to.be.bignumber.equal(suggesterBalanceBeforeReturnBond.add(suggesterBondAmount))
      })
      it('returns owner bond to bondFunds', async function() {
	let bondFundsBeforeReturnBond = await this.proxiedEscrow.bondFunds();
	await this.proxiedEscrow.returnBondsOnReject(id, {from: owner});
	expect(await this.proxiedEscrow.bondFunds()).to.be.bignumber.equal(bondFundsBeforeReturnBond.add(await this.proxiedEscrow.ownerBondAmount()));
      }) 
   })
   context('permissions', function() {
      context('onlyGoalOwner role', function() {
        context('fund escrow', function () {
          it('fails when not goal owner role', async function() {
            await expectRevert.unspecified(this.proxiedEscrow.fundEscrow(ownerBondDepositAmount , rewardDepositAmount , {from: suggester}))
          })
        })
      })
     context('notGoalOwner role', function() {
        context('deposit on suggest', function() {
          it('fails when has onlyGoalOwnerRole', async function() {
            await expectRevert.unspecified(this.proxiedEscrow.depositOnSuggestTestVersion(id, suggesterBondAmount, this.proxiedEscrow.address, {from: owner}))
          })
        })
     })
   })
    }) // deposit on suggest
  }) // when approved by payer
}); // with token, with proxy

})
}
