import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { connect } from "react-redux";
import { Card } from "react-native-paper";

const Profile = ({ auth: { userName, userEmail, userImage } }) => {
  return (
    <View style={styles.container}>
      <View >
        <Card style={styles.profileCard}>
          <Text style={styles.profileText}>Profile</Text>
          <View style={styles.profile}>
            <Image style={styles.userImage} source={{ uri: userImage }} />
          </View>
          <Text style={styles.userName}>Name : {userName}</Text>
          <Text style={styles.userEmail}>Email : {userEmail}</Text>
        </Card>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50 / 2,
    alignItems: "center",
  },
  profile: {
    alignItems: "center",
    marginTop: 50,
  },
  profileText: {
    fontSize: 28,
    textAlign: "center",
    marginTop: 50,
  },
  userName: {
    marginTop: 50,
    fontSize: 20,
    marginLeft: 100,
  },
  userEmail: {
    marginTop: 10,
    fontSize: 20,
    marginLeft: 100,
    marginBottom: 50,
  },
  profileCard: {
    margin: 20,
    borderColor: 'grey',
    borderRadius: 50,
  },
});
