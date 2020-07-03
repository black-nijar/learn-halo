import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const Messages = ({ item, userId, navigation }) => {
  const { height, width } = Dimensions.get('window');

  const convertTime = time => {
    let date = new Date(time);
    let newDate = new Date();
    let result = (date.getHours() < 10 ? '0' : '') + date.getHours() + ':';
    result += (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    if (newDate.getDay() !== date.getDay()) {
      result = `${result}`;
    }
    return result;
  };

  return (
    <View style={styles.msgContainer}>
      {item.message !== 'undefined' ? (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            maxWidth: width / 2 + 10,
            alignSelf: item.from === userId ? 'flex-end' : 'flex-start',
            backgroundColor: item.from === userId ? 'lightblue' : 'lightgrey',
            borderRadius: 10,
            padding: 5,
            marginBottom: 10
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('Bilingual', { item, userId })}
          >
            <Text style={styles.textMessage}>{item.message}</Text>
            <Text
              style={{
                color: item.from === userId ? 'grey' : 'green',
                fontSize: 11,
                alignSelf: 'flex-end'
              }}
            >
              {convertTime(item.createdAt)}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>connecting...</Text>
      )}
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  msgContainer: {
    flex: 1
  },
  textMessage: {
    color: 'black',
    padding: 8,
    fontSize: 14
  }
});
