import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Avatar, Paragraph } from "react-native-paper";

const ChatItem = ({ item }) => {
  console.log("ITEM :", item);
  return (
    <View>
      <TouchableOpacity
        style={styles.userData}
        onPress={() => navigation.navigate("Chat", item)}
      >
        <Avatar.Image source={{ uri: item.photoUrl }} size={40} />
        <View>
          <Paragraph style={styles.userName}>{item.name}</Paragraph>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  userData: {
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 15,
  },
  userName: {
    marginLeft: 20,
    marginTop: 10,
  },
});
