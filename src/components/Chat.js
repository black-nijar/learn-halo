import React, { Fragment, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/Ionicons";
import { connect } from "react-redux";
import dataBase from "../config/firebaseConfig";
import Messages from "./Messages";

const Chat = ({ route: { params }, auth: { userId } }) => {
  const defaultMsgs = [
    { id: 1, from: 12, message: "Hi" },
    { id: 2, from: 12, message: "Hello" },
    { id: 3, from: 12, message: "welcome" },
    { id: 4, from: 12, message: "thanks" }
  ];
  const [textMessage, setTextMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { id } = params;
  const convoIdFrom = userId + id;
  const convoIdTo = id + userId;
  // const recieverId = id + userId;

  useEffect(() => {
    dataBase
      .child("messages")
      .child(convoIdFrom)
      .on("value", snap => {
        let msgs = [];
        snap.forEach(child => {
          //  console.log("SNAP CHILD :", child.val());
          msgs.push({
            from: child.val().from,
            createdAt: child.val().createdAt,
            message: child.val().message
          });
        });
        setMessages(msgs);
      });
    dataBase
      .child("messages")
      .child(convoIdTo)
      .on("value", snap => {
        let msgs = [];
        snap.forEach(child => {
          //  console.log("SNAP CHILD :", child.val());
          msgs.push({
            from: child.val().from,
            createdAt: child.val().createdAt,
            message: child.val().message
          });
        });
        setMessages(msgs);
      });
  }, []);

  const onChange = text => {
    setTextMessage(text);
  };
  const onSend = async () => {
    if (textMessage.length > 0) {
      let msgId = dataBase
        .child("messages")
        .child(convoIdFrom)
        .push().key;
      let updates = {};
      let message = {
        message: textMessage,
        createdAt: new Date().getTime(),
        from: userId,
        to: id
      };
      updates[`messages/${convoIdFrom}/${msgId}`] = message;
      await dataBase.update(updates);
      setTextMessage("");
    }
  };
  
  const { height, width } = Dimensions.get("window");
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'android' ? 'height': ''}>
      <Fragment>
        <ScrollView
          keyboardDismissMode="interactive"
          style={{ flex: 1, backgroundColor: "#fff" }}
        >
          {messages.length > 0 ? (
            <FlatList
              style={{
                padding: 10,
                height: height * 0.8,
                backgroundColor: "white"
              }}
              data={messages}
              renderItem={({ item }) => (
                <Messages item={item} userId={userId} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text>Start conversation</Text>
          )}
        </ScrollView>
        <View style={styles.chatBoxContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message"
            onChangeText={onChange}
            value={textMessage}
            returnKeyType="send"
            multiline={true}
            autoFocus={true}
          />
          <TouchableOpacity style={styles.sendButtonOutline} onPress={onSend}>
            <Icon name="md-send" style={styles.sendButton} size={23} />
          </TouchableOpacity>
        </View>
      </Fragment>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Chat);

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    height: 40,
    fontSize: 20,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 7,
    marginBottom: 5
  },
  chatBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10
  },
  sendButton: {
    color: "white",
    paddingLeft: 5,
    alignItems: "center"
  },
  chatBoxContainer: {
    flexDirection: "row",
    padding: 5
    //marginTop: 0
  },
  messagesList: {
    flex: 1
  },
  sendButtonOutline: {
    backgroundColor: "#128C7E",
    borderRadius: 20,
    padding: 10,
    marginLeft: 10
  }
});
