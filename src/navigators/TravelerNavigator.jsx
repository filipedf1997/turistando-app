import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TabTraveler from './TabTraveler'
import Chat from '../pages/Chats/Chat'
import EditData from '../pages/MyAccount/EditData'
import ChangePassword from '../pages/MyAccount/ChangePassword'
import FAQ from '../pages/MyAccount/FAQ'

const TravelerNavigator = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
      initialRouteName="TabTraveler"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="TabTraveler"
        component={TabTraveler}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
      />
      <Stack.Screen
        name="EditData"
        component={EditData}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
      />
      <Stack.Screen
        name="FAQ"
        component={FAQ}
      />
    </Stack.Navigator>
  )
}

export default TravelerNavigator
