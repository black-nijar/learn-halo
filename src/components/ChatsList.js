import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { connect } from "react-redux";
import { partyUsers } from "../actions/action";

import dataBase from "../config/firebaseConfig";
import ChatItem from "./ChatItem";
import { Avatar, Paragraph } from "react-native-paper";

const ChatList = ({ auth: { userId }, partyUsers, users, navigation }) => {
  const [chatList, setChatList] = useState([]);

  // Fetching Party Users
  useEffect(() => {
    var partyUsers = [];
    dataBase.child("messages").on("value", (snap) => {
      // console.log('MESSAGE:', snap.val());
      for (let key in snap.val()) {
        // console.log('key', key)
        let convoId = key.split("&&");
        var partyId = "";
        if (convoId[0] === userId) {
          partyId = convoId[1];
        } else if (convoId[1] === userId) {
          partyId = convoId[0];
        }
        // console.log('PARTYID', partyId);
        dataBase
          .child("users")
          .child(partyId)
          .on("value", (snap) => {
            // console.log('SNAP VALUE', snap.val());
            let userValue = snap.val();
            partyUsers.push(userValue);
          });
        //console.log('partyUsers', partyUsers)
        setChatList(partyUsers);
      }
    });
  }, []);
  //console.log('PARTY USERS', chatList);

  // Remove duplicate users from party users
  const removeDuplicateUser = (data) => {
    let party_users = data.filter((item) => data.indexOf(item));
    return party_users;
  };
  return (
    <View>
      {chatList.length > 0 ? (
        <FlatList
          data={removeDuplicateUser(chatList)}
          renderItem={({ item }) => <ChatItem item={item} navigation={navigation}/>}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>No Contacts</Text>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

export default connect(mapStateToProps, { partyUsers })(ChatList);
