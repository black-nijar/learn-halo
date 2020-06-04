import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ChatHeader = ({user}) => {
  console.log('PROPS :', user)
  return (
    <View>
      <Text>{user.name}</Text>
    </View>
  )
}

export default ChatHeader

const styles = StyleSheet.create({})
