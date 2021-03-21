import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { useTheme } from 'react-native-paper'
import HomeTravelerNav from './HomeTraveler/HomeTravelerNav'
import MyAccountNav from './MyAccountNav/MyAccountNav'
import Chats from '../pages/Chats/Chats'
import Favorites from '../pages/Favorites/Favorites'
import Reservations from '../pages/Reservations/Reservations'

const Tab = createMaterialBottomTabNavigator()

const TabTraveler = () => {
  const { colors } = useTheme()

  return (
    <Tab.Navigator
      initialRouteName="HomeTravelerNav"
      shifting
      sceneAnimationEnabled
      activeColor={colors.primary}
      inactiveColor={colors.borderTabColor}
      barStyle={{ backgroundColor: colors.whiteGray, borderTopWidth: 1, borderColor: colors.borderTabColor }}
    >
      <Tab.Screen
        name="HomeTravelerNav"
        component={HomeTravelerNav}
        options={{
          tabBarIcon: 'home',
          tabBarLabel: 'Início',
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
        name="Reservations"
        component={Reservations}
        options={{
          tabBarIcon: 'calendar-clock',
          tabBarLabel: 'Reservas',
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: 'star',
          tabBarLabel: 'Favoritos',
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

export default TabTraveler
