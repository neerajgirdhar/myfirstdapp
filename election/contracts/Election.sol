pragma solidity ^0.4.24;

contract Election {
   
   //structure of Candidate
   //Solidity allows to create new structure type
   struct Candidate {
     //unsigned integer
     uint id; 
     string name;
     uint votecount;
   }

 //fetch candidate
 mapping(uint => Candidate) public candidates;
 mapping(address => bool) public voters;
 
  
 
  uint public candidatesCount;

  event votedEvent(
    uint indexed _candidateId
  );

  //constructor ...Name should be same as Contract
  function Election() public {
  addCandidate("Narendar Modi");
  addCandidate("Rahul Gandhi");
  addCandidate("Others"); 
  }

  function  addCandidate(string _name) private {
  candidatesCount ++;
  candidates[candidatesCount] = Candidate(candidatesCount ,_name,0);
  }

  function vote(uint _candidateId) public {
  require(!voters[msg.sender]);
  require(_candidateId > 0 && _candidateId <= candidatesCount);
  
  voters[msg.sender] = true;

  candidates[_candidateId].votecount++;
  votedEvent(_candidateId);
  }
}
