import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Chats from './Chats';
import SearchUser from './SearchUser';



const Tab = createMaterialTopTabNavigator();


function TopTab () {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#fff',
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: '#128C7E' },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Chats}
        options={{ tabBarLabel: 'Chats' }}
      />
      <Tab.Screen
        name="Search"
        component={SearchUser}
        options={{ tabBarLabel: 'Search' }}
      />
    </Tab.Navigator>
  );
}
export default TopTab