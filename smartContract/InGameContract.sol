// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "./ThesisErc20.sol";

/**
 * @title TruongThesisERC20
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */


contract InGameContract {

    address public owner;

    mapping(address => bool) public whitelistContract;
    
    uint256 public inGamePrice;
    uint256 public systemFee;
    uint256 public penaltyFee;
    uint256 public indexGame;
    uint256 public amountJoinGame;
    ThesisErc20 public mainToken;

    enum GameStatus {
        Pending,
        InGame,
        End
    }

    struct GameStruct {
        address[] joinUsers;
        GameStatus gameStatus;
        bool[] winner;
    }

    mapping (uint256 => GameStruct) public gameData;

    //event 
    event AddWhitelistSuccess(address newWallet);
    event RemoveWhitelistSuccess(address oldWallet);
    event JoinGame(uint256 gameIndex, address user);
    event StartGame(uint256 gameIndex);
    event BuySkin(address _user, uint256 cost);

    constructor(address _mainToken){
        mainToken = ThesisErc20(_mainToken);
        owner = msg.sender;
        inGamePrice = 100 * 10**18;
        systemFee = 10**16;
        penaltyFee = 5 * 10**16;
        amountJoinGame = 4;
    }

    // Get current index game
    function getIndexGame() view public returns (uint256) {
        return indexGame;
    }

    // Buy skin
    function buySkin(address _user, uint256 cost) public {
        mainToken.transferFrom(_user, address(this), cost * 10**18);
        emit BuySkin(_user, cost);
    }

    function getUserInGame(uint256 _gameIndex) view public returns (address[] memory) {
        require(_gameIndex <= indexGame, "Game not found");
        return gameData[indexGame].joinUsers;
    }

    // Check xem trong nhung game dang chay co game nao chua user nay khong
    function isInGame(uint256 _gameIndex, address _user)  view public returns (bool){
        for (uint256 i = 0; i < gameData[_gameIndex].joinUsers.length; i++){
            if (_user == gameData[_gameIndex].joinUsers[i]) {
                return true;
            } 
        }
        return false;
    }

    function joinGame(address _user) public {
        // Check xem vuot qua so luong user/1 game chua
        if (gameData[indexGame].joinUsers.length == amountJoinGame){
            indexGame++;
            gameData[indexGame].gameStatus = GameStatus.Pending;
        }

        GameStruct storage gameStructCurrent = gameData[indexGame];

        require(gameStructCurrent.gameStatus == GameStatus.Pending, "Not correct data game status");
        require(!isInGame(indexGame, _user));

        mainToken.transferFrom(_user, address(this), inGamePrice);
        
        gameStructCurrent.joinUsers.push(_user);
        emit JoinGame(indexGame, _user);

        // Khi them user moi vao du 4 nguoi thi start tran luon
        if (gameStructCurrent.joinUsers.length == amountJoinGame) {
            gameStructCurrent.gameStatus = GameStatus.InGame;
            emit StartGame(indexGame);
        }
    }

    function finalGame(bool[] calldata _winningIndex, uint256 gameID) public isFromWhitelist {
        require(_winningIndex.length == amountJoinGame, "Not correct");
        GameStruct storage gameStructCurrent = gameData[gameID];
        require(gameStructCurrent.gameStatus == GameStatus.InGame, "Not correct data game status");

        gameStructCurrent.gameStatus = GameStatus.End;
        uint256 sumPenty = 0;
        for (uint256 i = 0 ; i < _winningIndex.length;i++){
            gameStructCurrent.winner.push(_winningIndex[i]);
            if(_winningIndex[i]) sumPenty++;
        }
        uint256 rateBackWinner;
        if (sumPenty == 4) rateBackWinner = penaltyFee;
        else rateBackWinner = systemFee;

        for (uint256 i = 0 ; i<_winningIndex.length;i++){
            if(_winningIndex[i]) {
                mainToken.transfer(
                    gameStructCurrent.joinUsers[i], 
                    inGamePrice* amountJoinGame/sumPenty * (10**18 - rateBackWinner)/10**18
                );
            }
        }
    }

    modifier isFromOwner(){
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier isFromWhitelist(){
        require(whitelistContract[msg.sender], "Not whitelist");
        _;
    }

    function changeOwner(address newOwner) public isFromOwner {
        owner = newOwner;
    }

    function addWhitelist(address newWhitelist) public isFromOwner(){
        require(!whitelistContract[newWhitelist], "Already on whitelist");
        whitelistContract[newWhitelist] = true;

        emit AddWhitelistSuccess(newWhitelist);
    }

    function removeWhitelist(address oldWhitelist) public isFromOwner(){
        require(whitelistContract[oldWhitelist], "Address not found");
        whitelistContract[oldWhitelist] = false;

        emit RemoveWhitelistSuccess(oldWhitelist);
    }
}