import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import dataBase from '../config/firebaseConfig';

import { connect } from 'react-redux';
import { usersData, searchUser } from '../actions/action';
import UserItem from './UserItem.js';

const SearchUser = ({ usersData, users, searchUser, filteredUser, navigation }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    dataBase.on('value', (snap) => {
      const data = snap.val();
      usersData(data);
    })
  }, []);

  const onChange = text => searchUser(text, users);

  //Filter user 
  const listUser = filteredUser.length > 0 ? filteredUser : users;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.searchOutline}>
        <TextInput
          style={styles.textInput}
          placeholder='Search user'
          onChangeText={onChange}
          textContentType='username'
        />
        {
          listUser ? (
            <FlatList
              data={listUser}
              renderItem={({ item }) => <UserItem user={item} navigation={navigation}/>}
              keyExtractor={item => item.id}
            />
          ) : <Text>No Contacts...</Text>
        }
      </View>
    </SafeAreaView>
  )
};

const mapStateToProps = state => ({
  users: state.users,
  filteredUser: state.filteredUser
})
export default connect(mapStateToProps, { usersData, searchUser })(SearchUser)

const styles = StyleSheet.create({
  textInput: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 15,
    height: 40,
    paddingLeft: 10
  },
  searchOutline: {
    marginTop: 5,
    padding: 10
  }
})
