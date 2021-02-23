import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TabProvider from './TabProvider'
import Chat from '../pages/Chats/Chat'
import EditData from '../pages/MyAccount/EditData'
import ChangePassword from '../pages/MyAccount/ChangePassword'
import FAQ from '../pages/MyAccount/FAQ'

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

export default ProviderNavigator
