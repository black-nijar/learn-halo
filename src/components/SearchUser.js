import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { TextInput } from 'react-native-gesture-handler'

const SearchUser = () => {
  return (
    <View>
      <View style={styles.searchOutline}>
        <TextInput style={styles.textInput} autoFocus={true} placeholder='Search user'/>
      </View>
    </View>
  )
}

export default SearchUser

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
