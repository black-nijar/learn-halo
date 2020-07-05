import React from 'react';

import SearchUser from '../components/SearchUser';
import ChatList from '../components/ChatsList';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const TopTab = () => {
  return (
    <Tab.Navigator
      initialRouteName='Feed'
      tabBarOptions={{
        activeTintColor: '#fff',
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: '#128C7E' }
      }}
    >
      <Tab.Screen
        name='Feed'
        component={ChatList}
        options={{ tabBarLabel: 'Chats' }}
      />
      <Tab.Screen
        name='Search'
        component={SearchUser}
        options={{ tabBarLabel: 'Search' }}
      />
    </Tab.Navigator>
  );
};
export default TopTab;
