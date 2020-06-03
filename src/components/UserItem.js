import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar, Paragraph } from 'react-native-paper'

const UserItem = ({ user }) => {
  return (
    <View style={styles.userData}>
      <Avatar.Image source={{ uri: user.photoUrl }} size={40} />
      <View >
        <Paragraph style={styles.userName}>{user.givenName}</Paragraph>
      </View>
    </View>
  )
}

export default UserItem

const styles = StyleSheet.create({
  userData: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 15,
  },
  userName: {
    marginLeft: 20,
    marginTop: 10
  }
})
