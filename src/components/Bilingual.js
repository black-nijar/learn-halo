import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const Bilingual = ({ route: { params } }) => {
  const {
    item: { message, createdAt, from },
    userId,
  } = params;
  const { height, width } = Dimensions.get('window');

  //Convert Time
  const convertTime = (time) => {
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
    <View>
      {message !== 'undefined' ? (
        <View style={styles.msgContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              maxWidth: width / 2 + 10,
              alignSelf: from === userId ? 'flex-end' : 'flex-start',
              backgroundColor: from === userId ? 'lightblue' : 'lightgrey',
              borderRadius: 10,
              padding: 5,
              marginBottom: 10,
            }}
          >
            <Text style={styles.textMessage}>{message}</Text>
            <Text
              style={{
                color: from === userId ? 'grey' : 'green',
                fontSize: 11,
                alignSelf: 'flex-end',
                padding: 10,
              }}
            >
              {convertTime(createdAt)}
            </Text>
          </View>
        </View>
      ) : (
        <Text>checking...</Text>
      )}
    </View>
  );
};

export default Bilingual;

const styles = StyleSheet.create({
  msgContainer: {
    flex: 1,
  },
  textMessage: {
    color: 'black',
    padding: 8,
    fontSize: 14,
  },
});
