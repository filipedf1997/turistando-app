import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeProvider from '../pages/HomeProvider/HomeProvider'

const ProviderNavigator = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
      initialRouteName='HomeProvider'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name='HomeProvider'
        component={HomeProvider}
      />
    </Stack.Navigator>
  )
}

export default ProviderNavigator