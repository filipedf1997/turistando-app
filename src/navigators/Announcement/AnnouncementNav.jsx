import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Announcement from '../../pages/Announcement/Announcement'
import NewAnnouncement from '../../pages/Announcement/NewAnnouncement'
import EditAnnouncement from '../../pages/Announcement/EditAnnouncement'

const AnnouncementNav = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
      initialRouteName="Anunciar"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Anunciar"
        component={Announcement}
      />
      <Stack.Screen
        name="NewAnnouncement"
        component={NewAnnouncement}
      />
      <Stack.Screen
        name="EditAnnouncement"
        component={EditAnnouncement}
      />
    </Stack.Navigator>
  )
}

export default AnnouncementNav
