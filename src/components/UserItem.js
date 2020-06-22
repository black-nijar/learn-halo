import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Avatar, Paragraph } from 'react-native-paper';

const UserItem = ({ user, navigation }) => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.userData}
        onPress={() => navigation.navigate('Chat', user)}
      >
        <Avatar.Image source={{ uri: user.photoUrl }} size={40} />
        <View>
          <Paragraph style={styles.userName}>{user.givenName}</Paragraph>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UserItem;

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
});
