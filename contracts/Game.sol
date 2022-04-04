// SPDX-License-Identifier: MIT

pragma solidity 0.8.11;

contract Game {
  
  uint256 public fee;
  
  string[] private words;
  
  address public admin;
  
  mapping(address => uint256) public startedGame;
  
  struct Game {
      string word;
      address player;
      uint livesLeft;
      bool won;
  } 
  
  Game[] public games;

  constructor() {
    fee = 1 ether;
    admin = msg.sender;
  }

  modifier onlyAdmin{
    require(msg.sender == admin);
    _;
  }

  function sendEther() public payable onlyAdmin{}

  function changeFee(uint256 _fee) public {
    fee = _fee;
  }

  function getBalance() public view returns(uint256){
    return address(this).balance;
  }

  function getWords() public view onlyAdmin returns(string[] memory){
    return words;
  }

  function addWord(string memory _word) public onlyAdmin   {
    require(bytes(_word).length==5,"Word should be size of 5");
    words.push(_word);
  }

  function startGame(uint256 _choice) public payable {
    require(msg.value == fee);
    Game memory g = Game(words[_choice],msg.sender,6,false);
    games.push(g);
    startedGame[msg.sender] = games.length;
  }

  function checkWord( string memory _word) public returns(bool check){
    uint256 id = startedGame[msg.sender];
    // error in the if statement 
    if(keccak256(abi.encodePacked((games[id-1].word))) == keccak256(abi.encodePacked((_word)))){
      payable(msg.sender).transfer(fee*2);
      games[id-1].won = true;
      startedGame[msg.sender] = 0;
      return true;
    }
    else{
      games[id-1].livesLeft -= 1;
      return false;
    }
  }

  function getGameData (uint256 _id) public view returns(Game memory){
    return games[_id];
  }

}