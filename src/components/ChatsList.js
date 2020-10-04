import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { partyUsers } from '../actions/action';

import dataBase from '../config/firebaseConfig';
import ChatItem from './ChatItem';
import { Avatar, Paragraph } from 'react-native-paper';


const ChatList = ({ auth: { userId }, partyUsers, users, navigation }) => {
  const [chatList, setChatList] = useState([]);

  // Fetching Party Users
  useEffect(() => {
    var partyUsers = [];
    dataBase.child('messages').on('value', snap => {
      // console.log('MESSAGE:', snap.val());
      for (let key in snap.val()) {
        // console.log('key', key)
        let convoId = key.split('&&');
        var partyId = '';
        if (convoId[0] === userId) {
          partyId = convoId[1];
        } else if (convoId[1] === userId) {
          partyId = convoId[0];
        }
        // console.log('PARTYID', partyId);
        dataBase
          .child('users')
          .child(partyId)
          .on('value', snap => {
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
  const renderContacts = item => {
   // console.log('ITEM :', item);
    return (
      <View>
      <TouchableOpacity
        style={styles.userData}
        onPress={() => navigation.navigate('Chat', item)}
      >
        <Avatar.Image source={{ uri: item.photoUrl }} size={40} />
        <View>
          <Paragraph style={styles.userName}>
            {item.name}
          </Paragraph>
        </View>
      </TouchableOpacity>
    </View>
    );
  };
  const removeDuplicateUser = data => {
    let party_users = data.filter((item) => data.indexOf(item))
    return party_users;
  };
  return (
    <View>
      <FlatList
        data={removeDuplicateUser(chatList)}
        renderItem={({ item }) => renderContacts(item)}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users
});

const styles = StyleSheet.create({
  userData: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 15
  },
  userName: {
    marginLeft: 20,
    marginTop: 10
  }
})
export default connect(mapStateToProps, { partyUsers })(ChatList);
