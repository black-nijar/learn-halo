import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import * as Google from 'expo-google-app-auth';
import { NavigationContainer } from '@react-navigation/native';
import SignIn from './SignIn';
import Navigation from './Navigation'

const Auth = () => {
  const [formData, setformData] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photoUrl: ''
  })
  const { isSignedIn } = formData;
 
  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ANDROID_ID,
        iosClientId: IOS_ID,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        const { user: { name, email, photoUrl, familyName } } = result;

        setformData({ ...formData, name, email, photoUrl, isSignedIn: true })
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  const signOutWithGoogleAsync = async () => {
    try {
      await Google.logOutAsync({
        accessToken, androidClientId: ANDROID_ID
      })
    } catch (error) {
      throw new Error(error);
    }
  }
  return (
    <View>
      {
        isSignedIn ?
          (<NavigationContainer>
            <Navigation />
          </NavigationContainer>)
          :
          <SignIn onSignIn={signInWithGoogleAsync} />
      }
    </View>
  )
}

export default Auth

const styles = StyleSheet.create({})
