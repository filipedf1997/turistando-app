import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeTraveler from '../../pages/HomeTraveler/HomeTraveler'
import Filter from '../../pages/HomeTraveler/Filter'

const HomeTravelerNav = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
      initialRouteName="HomeTraveler"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="HomeTraveler"
        component={HomeTraveler}
      />
      <Stack.Screen
        name="Filter"
        component={Filter}
      />
    </Stack.Navigator>
  )
}

export default HomeTravelerNav
