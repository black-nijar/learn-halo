import React, { Fragment, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";

import Icon from "@expo/vector-icons/Ionicons";
import { connect } from "react-redux";
import dataBase from "../config/firebaseConfig";
import Messages from "./Messages";

const { height, width } = Dimensions.get("window");

const Chat = ({ route: { params }, auth: { userId } }) => {
  const [textMessage, setTextMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { id } = params;
  const convoIdFrom = userId + id;
  const convoIdTo = id + userId;

  useEffect(() => {
    dataBase
      .child("messages")
      .child(convoIdFrom)
      .on("value", snap => {
        let msgs = [];
        snap.forEach(child => {
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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "android" ? "height" : ""}
      keyboardVerticalOffset={height > 500 ? 90 : 70}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Fragment>
          {messages.length > 0 ? (
            <FlatList
              style={styles.flatList}
              data={messages}
              renderItem={({ item }) => (
                <Messages item={item} userId={userId} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text>Start conversation</Text>
          )}
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
      </TouchableWithoutFeedback>
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
    paddingLeft: 7
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
  },
  sendButtonOutline: {
    backgroundColor: "#128C7E",
    borderRadius: 20,
    padding: 10,
    marginLeft: 10
  },
  flatList: {
    flex: 1,
    padding: 10,
    height: height * 1,
    backgroundColor: "white"
  }
});
