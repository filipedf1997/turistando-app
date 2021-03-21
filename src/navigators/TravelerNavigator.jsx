import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TabTraveler from './TabTraveler'
import Chat from '../pages/Chats/Chat'
import AnnouncementDetails from '../pages/HomeTraveler/AnnouncementDetails'
import AnnouncementConfirm from '../pages/HomeTraveler/AnnouncementConfirm'
import PaymentData from '../pages/HomeTraveler/PaymentData'
import EvaluationScreen from '../pages/Reservations/EvaluationScreen'

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
        name="AnnouncementDetails"
        component={AnnouncementDetails}
      />
      <Stack.Screen
        name="AnnouncementConfirm"
        component={AnnouncementConfirm}
      />
      <Stack.Screen
        name="PaymentData"
        component={PaymentData}
      />
      <Stack.Screen
        name="EvaluationScreen"
        component={EvaluationScreen}
      />
    </Stack.Navigator>
  )
}

export default TravelerNavigator
