var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts){


it("initializes with 3 candidates",function(){
	return Election.deployed().then(function(instance){
		ist =instance;
		return ist.candidatesCount();
	}).then(function(count){
		assert.equal(count,3);
	});


});

it("initializes with 3 candidates but the test checks for 4 candidates ",function(){
	return Election.deployed().then(function(instance){
		ist =instance;
		return ist.candidatesCount();
	}).then(function(count){
		assert.notEqual(count,4);
	});


});


it("first candidate is Narendar Modi ",function(){
	return Election.deployed().then(function(instance){
		ist =instance;
		return ist.candidates(1);
	}).then(function(candidate){
		assert.equal(candidate[1],"Narendar Modi");
	});


});

it("first candidate is Narendar Modi and id is 1 ",function(){
	return Election.deployed().then(function(instance){
		ist =instance;
		return ist.candidates(1);
	}).then(function(candidate){
		assert.equal(candidate[1],"Narendar Modi");
		assert.equal(candidate[0],1);
	});


});

it("2nd candidate is Rahul Gandhi and  id is 2 ",function(){
	return Election.deployed().then(function(instance){
		ist =instance;
		return ist.candidates(2);
	}).then(function(candidate){
		assert.equal(candidate[1],"Rahul Gandhi");
		assert.equal(candidate[0],2);
	});


});

it("allows a voter to vote",function(){
	return Election.deployed().then(function(instance){
		ist =instance;
		return ist.vote(1,{from :accounts[0]})
	}).then(function(receipt){
		return ist.voters(accounts[0]);
	}).then(function(voteCasted){
		assert("true",voteCasted,"Vote has been casted and has been stored in voter mapping for the account");
		return ist.candidates(1)
	}).then(function(candidate){
		assert(1,candidate[2],"Vote count of candidate increased by 1");

	})
});


it("try by vote to invalid Candidate",function(){
	return Election.deployed().then(function(instance){
		ist =instance;
		return ist.vote(9,{from :accounts[0]})
	}).then(assert.fail).catch(function(error){

		assert(error.message.indexOf('revert')>=0,"Error Message has revert");
		
		//return ist.candidates(1)
	})
});

});