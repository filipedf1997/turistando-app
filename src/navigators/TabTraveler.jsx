import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { useTheme } from 'react-native-paper'
import HomeTraveler from '../pages/HomeTraveler/HomeTraveler'
import MyAccountNav from './MyAccountNav/MyAccountNav'
import Chats from '../pages/Chats/Chats'

const Tab = createMaterialBottomTabNavigator()

const TabTraveler = () => {
  const { colors } = useTheme()

  return (
    <Tab.Navigator
      initialRouteName="Página inicial"
      shifting
      sceneAnimationEnabled
      activeColor={colors.darkOrange}
      inactiveColor={colors.lightText}
      barStyle={{ backgroundColor: colors.tabColor }}
    >
      <Tab.Screen
        name="Página inicial"
        component={HomeTraveler}
        options={{
          tabBarIcon: 'home',
        }}
      />
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarIcon: 'message-text',
        }}
      />
      <Tab.Screen
        name="Minha conta"
        component={MyAccountNav}
        options={{
          tabBarIcon: 'account-circle',
        }}
      />
    </Tab.Navigator>
  )
}

export default TabTraveler
