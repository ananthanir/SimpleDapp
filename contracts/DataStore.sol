// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.28;

contract DataStore {
    string dataValue;
    
    function storeData(string memory messageData) public {
        dataValue = messageData;
    }
    
    function getData() view public returns(string memory outPutMesage) {
        return dataValue;
    } 
}