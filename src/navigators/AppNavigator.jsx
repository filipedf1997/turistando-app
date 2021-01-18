import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../pages/Home/Home'

const AuthNavigator = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
      initialRouteName='SignIn'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name='Home'
        component={Home}
      />
    </Stack.Navigator>
  )
}

export default AuthNavigator