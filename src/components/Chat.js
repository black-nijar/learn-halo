import React from 'react'
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/Ionicons';

const Chat = ({ route: { params } }) => {
  const onChange = () => { }
  return (
    <KeyboardAvoidingView style={{ flex: 1, }} >
      <ScrollView
        keyboardDismissMode="interactive"
        style={{ flex: 1, backgroundColor: "#fff" }}>
        <View>
          <Text>Nijar</Text>
        </View>
      </ScrollView>
      <View style={styles.chatBoxContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='Type a text'
          returnKeyType='send'
          multiline={true}
          autoFocus={true}
        />
        <TouchableOpacity style={styles.sendButtonOutline}>
          <Icon name='md-send' style={styles.sendButton} size={23} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
};

export default Chat

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    height: 40,
    fontSize: 20,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 7,
    marginBottom: 5
  },
  chatBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10
  },
  sendButton: {
    color: 'white',
    paddingLeft: 5,
    alignItems: 'center'
  },
  chatBoxContainer: {
    flexDirection: 'row',
    padding: 5,
    //marginTop: 0
  },
  messagesList: {
    flex: 1,
  },
  sendButtonOutline: {
    backgroundColor: '#128C7E',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10
  }
})
