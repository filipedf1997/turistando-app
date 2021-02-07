import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import HomeProvider from '../pages/HomeProvider/HomeProvider'
import MyAccount from '../pages/MyAccount/MyAccount'

const Tab = createMaterialBottomTabNavigator()

const TabProvider = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      sceneAnimationEnabled={true}
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
    </Tab.Navigator>
  )
}

export default TabProvider