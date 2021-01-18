import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignIn from '../pages/SignIn/SignIn'
import SignUp from '../pages/SignUp/SignUp'

const AuthNavigator = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
      initialRouteName='SignIn'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name='SignIn'
        component={SignIn}
      />
      <Stack.Screen
        name='SignUp'
        component={SignUp}
      />
    </Stack.Navigator>
  )
}

export default AuthNavigator