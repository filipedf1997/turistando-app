import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TabProvider from './TabProvider'
import Chat from '../pages/Chats/Chat'

const ProviderNavigator = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
      initialRouteName="TabProvider"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="TabProvider"
        component={TabProvider}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
      />
    </Stack.Navigator>
  )
}

export default ProviderNavigator
