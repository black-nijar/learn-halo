import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { TextInput, FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import dataBase from '../config/firebaseConfig';
import { usersData } from '../actions/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserItem from './UserItem.js';

const SearchUser = ({ usersData, users }) => {
  useEffect(() => {
    dataBase.on('value', (snap) => {
      const data = snap.val();
      usersData(data);
    })
  }, []);
console.log('USERS DATA From SEARCH :', users)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.searchOutline}>
        <TextInput style={styles.textInput} placeholder='Search user' />
        <FlatList
          data={users}
          renderItem={({ item }) => <UserItem user={item}/>}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  )
};

const mapStateToProps = state => ({
  users: state.users
})
export default connect(mapStateToProps, { usersData })(SearchUser)

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
