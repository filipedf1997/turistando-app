import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TabTraveler from './TabTraveler'

const TravelerNavigator = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
      initialRouteName='TabTraveler'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name='TabTraveler'
        component={TabTraveler}
      />
    </Stack.Navigator>
  )
}

export default TravelerNavigator