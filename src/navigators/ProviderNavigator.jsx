import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TabProvider from './TabProvider'
import Chat from '../pages/Chats/Chat'
import AnnouncementDetails from '../pages/Announcement/AnnouncementDetails'

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
        name="AnnouncementDetails"
        component={AnnouncementDetails}
      />
    </Stack.Navigator>
  )
}

export default ProviderNavigator
