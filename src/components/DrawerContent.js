import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar, Title, Caption, Drawer } from 'react-native-paper';
import { connect } from 'react-redux';

const DrawerContent = (props) => {
  const { auth: { userName, userImage, userEmail } } = props;
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image source={{ uri: userImage }} size={50} />
              <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                <Title style={styles.title}>{userName}</Title>
                <Caption style={styles.caption}>@its.{userEmail}</Caption>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Drawer.Section>
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name='home-outline' color={color} size={size} />
                )}
                label='Home'
                onPress={() => { props.navigation.navigate('Home')}}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name='account-outline' color={color} size={size} />
                )}
                label='Profile'
                onPress={() => { props.navigation.navigate('Profile')}}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name='settings-outline' color={color} size={size} />
                )}
                label='Settings'
                onPress={() => { props.navigation.navigate('Settings')}}
              />
            </Drawer.Section>
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  )
}


const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(DrawerContent)

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});