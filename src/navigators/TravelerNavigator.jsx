import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeTraveler from '../pages/HomeTraveler/HomeTraveler'

const TravelerNavigator = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
      initialRouteName='HomeTraveler'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name='HomeTraveler'
        component={HomeTraveler}
      />
    </Stack.Navigator>
  )
}

export default TravelerNavigator