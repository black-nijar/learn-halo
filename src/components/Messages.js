import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Messages = ({ item, userId }) => {
  console.log("item :", item);

  const { height, width } = Dimensions.get("window");
  return (
    <SafeAreaView >
      {item.message !== "undefined" ? (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            maxWidth: width / 2 + 10,
            alignSelf: item.from === userId ? "flex-end" : "flex-start",
            backgroundColor: item.from === userId ? "lightblue" : "lightgrey",
            borderRadius: 10,
            padding: 5,
            marginBottom: 2
          }}
        >
          <Text style={{ color: "black", padding: 2, fontSize: 14 }}>
            {item.message}
          </Text>
        </View>
      ) : (
        <Text>checking...</Text>
      )}
    </SafeAreaView>
  );
};

export default Messages;

const styles = StyleSheet.create({});
