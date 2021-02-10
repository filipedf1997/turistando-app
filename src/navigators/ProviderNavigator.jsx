import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TabProvider from './TabProvider'

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
    </Stack.Navigator>
  )
}

export default ProviderNavigator
