import React, { useState } from 'react'
import { View } from 'react-native'
import * as Google from 'expo-google-app-auth';
import { connect } from 'react-redux';

import SignIn from './SignIn';
import { userProfile } from '../actions/auth';

const Auth = ({ userProfile }) => {
  const [formData, setformData] = useState({
    name: '',
    email: '',
    photoUrl: ''
  })
  
  
  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ANDROID_ID,
       // iosClientId: IOS_ID,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        const { user: { name, email, photoUrl, familyName } } = result;
       
        setformData({ ...formData, name, email, photoUrl });
        userProfile(name, email, photoUrl);
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
      <SignIn onSignIn={signInWithGoogleAsync}/>
    </View>
  )
}

export default connect(null, { userProfile })(Auth)
