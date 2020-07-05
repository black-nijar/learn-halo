import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from 'react-native-vector-icons';

import TopTab from './src/NavigationScreen/TopBarNavigation';
import DrawerContent from './src/NavigationScreen/DrawerContent';

import Auth from './src/components/Auth';
import Profile from './src/components/Profile';
import Settings from './src/components/Settings';
import Bilingual from './src/components/Bilingual';
import ChatBox from './src/components/ChatBox';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#128C7E' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}
    >
      <Stack.Screen
        name='HaloApp'
        component={TopTab}
        options={{
          title: 'HaloApp',
          headerRight: () => (
            <Ionicons.Button
              name='ios-menu'
              size={25}
              backgroundColor='#128C7E'
              onPress={() => navigation.openDrawer()}
            ></Ionicons.Button>
          )
        }}
      />
      <Stack.Screen
        name='Chat'
        options={({ route }) => ({
          title: route.params.givenName,
          headerTitleAlign: 'center'
        })}
        component={ChatBox}
      />
      <Stack.Screen
        name='Bilingual'
        options={{ title: 'Message', headerTitleAlign: 'center' }}
        component={Bilingual}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#128C7E' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}
    >
      <Stack.Screen
        name='Profile'
        component={Profile}
        options={{
          title: 'Profile',
          headerRight: () => (
            <Ionicons.Button
              name='ios-menu'
              size={25}
              backgroundColor='#128C7E'
              onPress={() => navigation.openDrawer()}
            ></Ionicons.Button>
          )
        }}
      />
    </Stack.Navigator>
  );
};

const SettingsStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#128C7E' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}
    >
      <Stack.Screen
        name='Profile'
        component={Settings}
        options={{
          title: 'Settings',
          headerRight: () => (
            <Ionicons.Button
              name='ios-menu'
              size={25}
              backgroundColor='#128C7E'
              onPress={() => navigation.openDrawer()}
            ></Ionicons.Button>
          )
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name='Home' component={HomeStack} />
      <Drawer.Screen name='Profile' component={ProfileStack} />
      <Drawer.Screen name='Settings' component={SettingsStack} />
    </Drawer.Navigator>
  );
};
const App = ({ auth: { isAuthenticated, loading } }) => {
  console.log('auth', isAuthenticated, loading)
  return (
    <View style={styles.container}>
      {isAuthenticated && !loading ? (
        <NavigationContainer>
          <DrawerNavigation />
        </NavigationContainer>
      ) : (
        <Auth />
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
});
