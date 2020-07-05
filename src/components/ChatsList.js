import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

import { connect } from 'react-redux';
import { partyUsers } from '../actions/action';

import dataBase from '../config/firebaseConfig';
import ChatItem from './ChatItem';

const ChatList = ({ auth: { userId }, partyUsers, users }) => {
  // Fetching Party Users
  useEffect(() => {
    dataBase
      .child('convoIds')
      .child(userId)
      .on('child_added', snap => {
        // console.log('SNAP:', snap.val());
        let snapValue = snap.val();
        let party_user = [];
        party_user.push({ snapValue });
        party_user.forEach(user => {
          dataBase
            .child('users')
            .child(user.snapValue)
            .on('value', snap => {
              //  console.log('SNAP:', snap);
              partyUsers(snap);
            });
        });
      });
  }, []);
  console.log('PARTY USERS', users.party_users);
  return (
    <View>
      <Text>ChatList</Text>
      <FlatList
        data={users.party_users}
        renderItem={({ item }) => (
              <ChatItem user={item} navigation={navigation} />
            )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users
});

export default connect(mapStateToProps, { partyUsers })(ChatList);
