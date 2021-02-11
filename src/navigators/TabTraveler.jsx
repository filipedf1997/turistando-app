import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import HomeTraveler from '../pages/HomeTraveler/HomeTraveler'
import MyAccount from '../pages/MyAccount/MyAccount'
import Chats from '../pages/Chats/Chats'

const Tab = createMaterialBottomTabNavigator()

const TabTraveler = () => (
  <Tab.Navigator
    initialRouteName="Home"
    shifting
    sceneAnimationEnabled
  >
    <Tab.Screen
      name="Home"
      component={HomeTraveler}
      options={{
        tabBarIcon: 'home',
      }}
    />
    <Tab.Screen
      name="Perfil"
      component={MyAccount}
      options={{
        tabBarIcon: 'account',
      }}
    />
    <Tab.Screen
      name="Chats"
      component={Chats}
      options={{
        tabBarIcon: 'chat',
      }}
    />
  </Tab.Navigator>
)

export default TabTraveler
