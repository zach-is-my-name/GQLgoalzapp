const { BN, constants, expectEvent, expectRevert } = require('openzeppelin-test-helpers');
const { expect } = require('chai');
const { ZERO_ADDRESS } = constants;
const GoalEscrowTestVersion = artifacts.require('GoalEscrowTestVersion');
const { advanceTimeAndBlock } = require("../utils/helpers/advance_time_and_block.js");

function shouldBehaveLikeERC20Protection(errorPrefix, initialSupply, initialHolder, recipient, anotherAccount) {
  // bypass scheduler and protect initialHolder's tokens

  describe('token holder has no tokens under protection', function() {
    describe('amount protected', function() {
      it('returns 0', async function() {
        expect(await this.token.amountProtected(initialHolder)).to.be.bignumber.equal('0');
      })
    })
    describe('send tokens', function() {
      it('succeeds', async function() {
        await this.token.transferInternal(initialHolder, recipient, initialSupply);

      expect(await this.token.balanceOf(initialHolder)).to.be.bignumber.equal('0');

      expect(await this.token.balanceOf(recipient)).to.be.bignumber.equal(new BN(initialSupply));
      })
    })

    describe('protectTokens', function() {
    beforeEach(async function () {
      const id = web3.utils.utf8ToHex('cjorlslvv0fcz01119bgpvvmt')
      this.escrow = await GoalEscrowTestVersion.new(); 
      await this.escrow.initMaster(this.token.address, 30);
      //await this.token.transfer(anotherAccount, 50, {from:initialHolder});
      let balance = await this.token.balanceOf(initialHolder);
      console.log('balanceOf Initial Holder ', balance.toString());
      await this.token.approve(this.escrow.address, 50, {from: initialHolder});
      await this.token.transfer(anotherAccount, 50, {from:initialHolder});
      await this.token.approve(this.escrow.address, 50, {from: anotherAccount});
      await this.escrow.newGoalInitAndFund(this.token.address, 30, 25, 25, {from:initialHolder});
      await this.escrow.depositOnSuggestTestVersion(id, 5, this.escrow.address, {from: anotherAccount});
      await this.escrow.disburseOnAccept(id, {from:initialHolder});
    })
      it("places specified amount of target user's tokens under protection", async function() {
        //await this.token.timeProtectTokens(initialHolder, initialSupply);
        let amountProtected = (await this.token.amountProtected(initialHolder)).toString()
        console.log(' log amount Protected(initialHolder) ', amountProtected) 
	expect(await this.token.amountProtected(initialHolder)).to.be.bignumber.equal(new BN(await this.escrow.ownerBondAmount()) ); })
     }) 
  })

  describe('while account has tokens under protection',  function() {
    beforeEach(async function () {
      const id = web3.utils.utf8ToHex('cjorlslvv0fcz01119bgpvvmm')
      this.escrow = await GoalEscrowTestVersion.new(); 
      await this.escrow.initMaster(this.token.address, 30);
      await this.token.transfer(anotherAccount, 50, {from:initialHolder});
      await this.token.approve(this.escrow.address, 50, {from: initialHolder});
      await this.escrow.newGoalInitAndFund(this.token.address, 30, 25, 25, {from:initialHolder});
      await this.token.approve(this.escrow.address, 50, {from: anotherAccount});
      await this.escrow.depositOnSuggestTestVersion(id, 25, this.escrow.address, {from: anotherAccount});
      await this.escrow.disburseOnAccept(id, {from:initialHolder});
      //await advanceTimeAndBlock(await this.escrow.returnBondsOnTimeOut(id));
    })
    describe('amount protected', function () {
      it('returns the total number of tokens under protection', async function () {
        //await this.token.timeProtectTokens(initialHolder, initialSupply);
        expect(await this.token.amountProtected(initialHolder)).to.be.bignumber.equal(new BN(await this.escrow.ownerBondAmount()))
      })
    })
   /******vvvvvvvvv******/ 
    describe('token holder tries to send tokens', function () {
      it('reverts', async function() {
        //await this.token.timeProtectTokens(initialHolder, initialSupply);
 	let protected =	await this.token.amountProtected(initialHolder);
	console.log("INITIAL_HOLDER_AMOUNT_PROTECTED", protected.toNumber());
      await expectRevert.unspecified(this.token.transferInternal(initialHolder, recipient, initialSupply));
	let recipientBalance = await this.token.balanceOf(recipient);
  	console.log("RECIPIENT_BALANCE", recipientBalance.toNumber());
      });
    });
    
  /* Only with Aion deployed
     describe('remove protection', function() {
      it('removes specified number of tokens, on specified account', async function() {
       //await this.token.timeProtectTokens(initialHolder, initialSupply);
	//let protected = await this.token.amountProtected(initialHolder);
        await this.token.removeTokenProtection(initialHolder,initialSupply)
        expect(await this.token.amountProtected(initialHolder)).to.be.bignumber.equal("0");
      });
    }); */
    });
    describe('when the requested account has no protected tokens', function() {
      describe('amountProtected', function() {
        it('returns zero', async function () {
          expect(await this.token.amountProtected(recipient)).to.be.bignumber.equal('0');
        });
      });
      describe('token holder tries to send tokens', function() {
      it('succeeds', async function() {
        await this.token.transferInternal(initialHolder, recipient, initialSupply)

        expect(await this.token.balanceOf(initialHolder)).to.be.bignumber.equal('0');

        expect(await this.token.balanceOf(recipient)).to.be.bignumber.equal(new BN(initialSupply));
      })
      })
    });
  };


module.exports = {
  shouldBehaveLikeERC20Protection
};
/*
-- pre-seed x protected tokens for initialHolder
-- amountProtected(initialHolder) ==  x
-- expectRevert(await this.token.transfer(x, recipient))
-- protectTokens(initialHolder, y tokens), amountProtected(initialHolder) == x tokens + y tokens == z tokens
-- expectRevert(await this.token.transfer(x, recipient))
-- expectRevert(await this.token.transfer(x, recipient))
-- removeTokenPrection(initialHolder, z), amountProtected(initialHolder) == 0
-- transfer(z, recipient),   expext success
*/
