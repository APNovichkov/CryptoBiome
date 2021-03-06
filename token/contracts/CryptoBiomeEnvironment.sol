pragma solidity ^0.6.0;

import "./ownable.sol";

contract CryptoBiomeEnvironment is Ownable {
    uint256 biomeHeight = 10;
    uint256 biomeWidth = 10;
    uint256 colorMax = 256;
    uint256 public numberBiomes = 0;

    struct CryptoBiome {
        string dnaSequence;
        string dateAdded;
        uint256[] biomeColors;
    }

    // Events
    event AddedNewBiome(string message, uint id, string dnaSequence);
    event ShowBiome(string dnaSequence, string dateAdded, uint[] randomColors);
    event NumBiomes(uint256 numberBiomes);
    
    CryptoBiome[] public cryptoBiomes;

    mapping(uint256 => address) public biomeToOwner;

    function createCryptoBiome(string memory dnaSequence) public {
        // Require something..
        string memory dateAdded = "09/24/25";
        uint256[] memory biomeColors = _generateRandomColors(dnaSequence);
        _createCryptoBiome(dnaSequence, dateAdded, biomeColors);
    }

    function _createCryptoBiome(string memory dnaSequence, string memory dateAdded, uint256[] memory biomeColors) internal {
        cryptoBiomes.push(CryptoBiome({dnaSequence: dnaSequence, dateAdded: dateAdded, biomeColors: biomeColors}));
        uint id = cryptoBiomes.length-1;
        emit NumBiomes(numberBiomes);
        numberBiomes++;
        emit AddedNewBiome("Added new biome", id, cryptoBiomes[id].dnaSequence);
        emit NumBiomes(numberBiomes);
    }

    function _generateRandomColors(string memory dnaSequence) private view returns (uint256[] memory){
        uint256[] memory biomeColors = new uint256[](biomeHeight * biomeWidth);
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(dnaSequence)));
        bytes32 bytesRandom = keccak256(abi.encodePacked(dnaSequence));

        uint256 test = uint256(bytesRandom);

        // Run through the # of columns we need
        for (uint256 i = 0; i < biomeColors.length; i++) {
            uint randomIntFromByte = uint(uint8(bytesRandom[i%bytesRandom.length]));

            biomeColors[i] = ((randomIntFromByte * randomNumber) % colorMax);
        }
        return biomeColors;
    }

    function getNumBiomes() public returns (uint256){
        return numberBiomes;
    }

    function getCryptobiomeById(uint id) public returns (string memory){
        CryptoBiome storage biome = cryptoBiomes[id];
        emit ShowBiome(biome.dnaSequence, biome.dateAdded, biome.biomeColors);
    }

    function getCryptobiomeColorsById(uint id) public returns (uint256[] memory){
        return cryptoBiomes[id].biomeColors;
    }

    function getCryptobiomeSequenceById(uint id) public returns (string memory){
        CryptoBiome storage biome = cryptoBiomes[id];
        return biome.dnaSequence;
    }
}
