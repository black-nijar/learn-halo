import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import dataBase from '../config/firebaseConfig';

import { connect } from 'react-redux';
import { usersData, searchUser } from '../actions/action';
import UserItem from './UserItem.js';

const SearchUser = ({
  usersData,
  users,
  searchUser,
  filteredUser,
  navigation,
  auth
}) => {
  // Fetching Users
  useEffect(() => {
    dataBase.child('users').on('value', snap => {
      const data = snap.val();
      // console.log('AUTH :', auth.userId)
      usersData(data, auth.userId);
    });
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
        {listUser ? (
          <FlatList
            data={listUser}
            renderItem={({ item }) => (
              <UserItem user={item} navigation={navigation} />
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <Text style={{ textAlign: 'center' }}>Updating...</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  users: state.users,
  filteredUser: state.filteredUser,
  auth: state.auth
});
export default connect(mapStateToProps, { usersData, searchUser })(SearchUser);

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
});
