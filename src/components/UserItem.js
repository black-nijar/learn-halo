import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar, Paragraph } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'

const UserItem = ({ user, navigation }) => {
  return (
    <View >
      <TouchableOpacity style={styles.userData} onPress={() => navigation.navigate('Chat',user )}>
        <Avatar.Image source={{ uri: user.photoUrl }}  size={40} />
        <View >
          <Paragraph style={styles.userName}>{user.givenName}</Paragraph>
        </View>
      </TouchableOpacity>
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
