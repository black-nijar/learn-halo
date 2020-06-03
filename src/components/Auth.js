import React, { useState } from 'react'
import { View } from 'react-native'
import * as Google from 'expo-google-app-auth';
import { connect } from 'react-redux';

import SignIn from './SignIn';
import { userProfile } from '../actions/auth';

import dataBase from '../config/firebaseConfig';

const Auth = ({ userProfile }) => {
  //OAuth ID
 
  
  //Child path for DB
  const userData = dataBase.child('users');
  
  //Google signin
  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ANDROID_ID,
       // iosClientId: IOS_ID,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        const { user: { name, email, photoUrl, familyName, id } } = result;

        // Upload data to database
        userData.child(id).set(result.user)
        
        userProfile(name, email, photoUrl);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  //Google Sign out
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
