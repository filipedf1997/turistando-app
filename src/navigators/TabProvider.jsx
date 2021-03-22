import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { useTheme } from 'react-native-paper'
import { FontAwesome5 } from '@expo/vector-icons'
import HomeProvider from '../pages/HomeProvider/HomeProvider'
import MyAccountNav from './MyAccountNav/MyAccountNav'
import Chats from '../pages/Chats/Chats'
import AnnouncementNav from './Announcement/AnnouncementNav'

const Tab = createMaterialBottomTabNavigator()

const TabProvider = () => {
  const { colors } = useTheme()

  return (
    <Tab.Navigator
      initialRouteName="HomeProvider"
      shifting
      sceneAnimationEnabled
      activeColor={colors.primary}
      inactiveColor={colors.gray}
      barStyle={{ backgroundColor: colors.background, borderTopWidth: 1, borderColor: colors.whiteGray }}
    >
      <Tab.Screen
        name="HomeProvider"
        component={HomeProvider}
        options={{
          tabBarIcon: 'home',
          tabBarLabel: 'Início',
        }}
      />
      <Tab.Screen
        name="AnnouncementNav"
        component={AnnouncementNav}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="bullhorn" size={18} color={color} />,
          tabBarLabel: 'Anunciar',
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
        name="MyAccountNav"
        component={MyAccountNav}
        options={{
          tabBarIcon: 'account-circle',
          tabBarLabel: 'Conta',
        }}
      />
    </Tab.Navigator>
  )
}

export default TabProvider
