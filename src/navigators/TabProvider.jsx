import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { useTheme } from 'react-native-paper'
import HomeProvider from '../pages/HomeProvider/HomeProvider'
import MyAccount from '../pages/MyAccount/MyAccount'
import Chats from '../pages/Chats/Chats'
import Announcement from '../pages/Announcement/Announcement'

const Tab = createMaterialBottomTabNavigator()

const TabProvider = () => {
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
        component={HomeProvider}
        options={{
          tabBarIcon: 'home',
        }}
      />
      <Tab.Screen
        name="Anunciar"
        component={Announcement}
        options={{
          tabBarIcon: 'bullhorn',
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chats}
        options={{
          tabBarIcon: 'message-text',
        }}
      />
      <Tab.Screen
        name="Minha conta"
        component={MyAccount}
        options={{
          tabBarIcon: 'account-circle',
        }}
      />
    </Tab.Navigator>
  )
}

export default TabProvider
