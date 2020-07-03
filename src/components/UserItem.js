import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Avatar, Paragraph } from 'react-native-paper';

const UserItem = ({ user, navigation }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.userData}
        onPress={() => navigation.navigate('Chat', user)}
      >
        <Avatar.Image source={{ uri: user.photoUrl }} size={40} />
        <View>
          <Paragraph style={styles.userName}>
            {user.name}
          </Paragraph>
        </View>
      </TouchableOpacity>
    </View>
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
