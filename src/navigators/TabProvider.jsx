import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import HomeProvider from '../pages/HomeProvider/HomeProvider'
import MyAccount from '../pages/MyAccount/MyAccount'
import Chats from '../pages/Chats/Chats'

const Tab = createMaterialBottomTabNavigator()

const TabProvider = () => (
  <Tab.Navigator
    initialRouteName="Home"
    shifting
    sceneAnimationEnabled
  >
    <Tab.Screen
      name="Home"
      component={HomeProvider}
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

export default TabProvider
