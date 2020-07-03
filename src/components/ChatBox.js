import React, { Fragment, Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';
import { connect } from 'react-redux';
import dataBase from '../config/firebaseConfig';
import Messages from './Messages';

const { height, width } = Dimensions.get('window');

class Chat extends Component {
  state = {
    text: '',
    allMessages: []
  };
  componentDidMount() {
    const {
      route: { params },
      auth: { userId }
    } = this.props;
    const { id } = params;
    const convoIdFrom = userId + id;
    const convoIdTo = id + userId;
    var msgs = [];
    this.fetchingFromMessages(msgs, convoIdFrom);
    this.fetchingToMessages(msgs, convoIdTo);
  }

  // Fetching ConvoIDFrom Messages
  fetchingFromMessages = (msgs, convoIdFrom) => {
    dataBase
      .child('messages')
      .child(convoIdFrom)
      .on('child_added', snap => {
        const snapValue = snap.val();
        msgs.push({
          from: snapValue.from,
          createdAt: snapValue.createdAt,
          message: snapValue.message
        });
        this.setState({ allMessages: msgs });
      });
  };

  // Fetching ConvoIDTo Messages
  fetchingToMessages = (msgs, convoIdTo) => {
    dataBase
      .child('messages')
      .child(convoIdTo)
      .on('child_added', snap => {
        const snapValue = snap.val();
        msgs.push({
          from: snapValue.from,
          createdAt: snapValue.createdAt,
          message: snapValue.message
        });
        this.setState({ allMessages: msgs });
      });
  };
  onChange = text => {
    this.setState({ text });
  };

  // Sending message to firebase
  onSend = () => {
    const {
      route: { params },
      auth: { userId }
    } = this.props;
    const { id } = params;
    const convoIdFrom = userId + id;
    if (this.state.text.length > 0) {
      let msgId = dataBase
        .child('messages')
        .child(convoIdFrom)
        .push().key;
      let updates = {};
      let message = {
        message: this.state.text,
        createdAt: new Date().getTime(),
        from: userId,
        to: id
      };
      updates[`messages/${convoIdFrom}/${msgId}`] = message;
      dataBase.update(updates);
      this.setState({ text: '' });
    }
  };
  render() {
    const {
      navigation,
      auth: { userId }
    } = this.props;
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <Fragment>
            {this.state.allMessages.length > 0 ? (
              <FlatList
                ref={ref => {
                  this.scrollView = ref;
                }}
                onContentSizeChange={() =>
                  this.scrollView.scrollToEnd({ animated: true })
                }
                style={styles.flatList}
                data={this.state.allMessages.sort((a, b) => {
                  return (
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                  );
                })}
                renderItem={({ item }) => (
                  <Messages
                    item={item}
                    userId={userId}
                    navigation={navigation}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : (
              <View style={styles.startConvo}>
                <Text style={styles.startConvoText}>Start Conversation</Text>
              </View>
            )}
            <View style={styles.chatBoxContainer}>
              <TextInput
                style={styles.textInput}
                placeholder='Type a message'
                onChangeText={this.onChange}
                value={this.state.text}
                returnKeyType='send'
                multiline={true}
              />
              <TouchableOpacity
                style={styles.sendButtonOutline}
                onPress={this.onSend}
              >
                <Icon name='md-send' style={styles.sendButton} size={20} />
              </TouchableOpacity>
            </View>
          </Fragment>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Chat);

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    height: 38,
    fontSize: 15,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 7
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
    padding: 5
  },
  sendButtonOutline: {
    backgroundColor: '#128C7E',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10
  },
  flatList: {
    flex: 1,
    padding: 10,
    height: height * 1,
    backgroundColor: 'white'
  },
  startConvo: {
    backgroundColor: '#b0c6e8',
    textAlign: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 10
  },
  startConvoText: {
    textAlign: 'center',
    color: '#2c384a'
  }
});
