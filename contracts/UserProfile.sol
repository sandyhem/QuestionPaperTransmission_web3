// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract UserProfile {
    struct User {
        uint id;
        string name;
        uint age;
    }

    mapping(uint => User) public users;
    uint public userCount;

    event UserCreated(uint id, string name, uint age);
    event UserUpdated(uint id, string name, uint age);
    event UserDeleted(uint id);

    function createUser(string memory _name, uint _age) public {
        userCount++;
        users[userCount] = User(userCount, _name, _age);
        emit UserCreated(userCount, _name, _age);  // 🔴 Event emitted
    }

    function updateUser(uint _id, string memory _name, uint _age) public {
        require(_id > 0 && _id <= userCount, "User does not exist");
        users[_id] = User(_id, _name, _age);
        emit UserUpdated(_id, _name, _age);  // 🔴 Event emitted
    }

    function deleteUser(uint _id) public {
        require(_id > 0 && _id <= userCount, "User does not exist");
        delete users[_id];
        emit UserDeleted(_id);  // 🔴 Event emitted
    }

    function getUser(uint _id) public view returns (User memory) {
        require(_id > 0 && _id <= userCount, "User does not exist");
        return users[_id];
    }
}
