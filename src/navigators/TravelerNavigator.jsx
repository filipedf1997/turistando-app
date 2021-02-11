import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TabTraveler from './TabTraveler'
import Chat from '../pages/Chats/Chat'

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
    </Stack.Navigator>
  )
}

export default TravelerNavigator
