import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const SignIn = ({ onSignIn }) => {
  return (
    <View style={styles.signIn}>
      <Button title='Sign In with Google' onPress={onSignIn}/>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
  signIn: {
    marginTop: 90
  }
})
