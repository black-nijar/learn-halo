import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Messages = ({ item, userId }) => {
  console.log("item :", item);

  const { height, width } = Dimensions.get("window");

  const convertTime = (time) => {
    let date = new Date(time);
    let newDate = new Date();
    let result = (date.getHours() < 10 ? '0': '') + date.getHours() + ':';
    result += (date.getMinutes() < 10 ? '0': '') + date.getMinutes();
    if (newDate.getDay() !== date.getDay()) {
      result = `${result}`
    }
    return result;
  };

  return (
    <View style={styles.msgContainer}>
      {item.message !== "undefined" ? (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            maxWidth: width / 2 + 10,
            alignSelf: item.from === userId ? "flex-end" : "flex-start",
            backgroundColor: item.from === userId ? "lightblue" : "lightgrey",
            borderRadius: 10,
            padding: 5,
            marginBottom: 10
          }}
        >
          <Text style={styles.textMessage}>{item.message}</Text>
          <Text style={styles.msgTime}>{convertTime(item.createdAt)}</Text>
        </View>
      ) : (
        <Text>checking...</Text>
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
    color: "black",
    padding: 8,
    fontSize: 14
  },
  msgTime: {
    color: 'grey',
    fontSize: 11,
    alignSelf: 'flex-end'
  }
});