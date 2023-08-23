// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ThesisErc1155 is ERC1155, Ownable{
    mapping (uint256 => string) private _uris;

    constructor() ERC1155("") {}

    function uri(uint256 tokenId) override public view returns (string memory) {
        return (_uris[tokenId]);
    }

    function setTokenUri(uint256 _tokenId, string memory _uri) public onlyOwner {
        _uris[_tokenId] = _uri;
    }

    function mint(address recipient, uint256 tokenId, uint256 amount) public onlyOwner {
        _mint(recipient, tokenId, amount, "");
    }
}