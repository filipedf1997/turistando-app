import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MyAccount from '../../pages/MyAccount/MyAccount'
import EditData from '../../pages/MyAccount/EditData'
import ChangePassword from '../../pages/MyAccount/ChangePassword'
import FAQ from '../../pages/MyAccount/FAQ'

const MyAccountNav = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
      initialRouteName="Minha conta"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Minha conta"
        component={MyAccount}
      />
      <Stack.Screen
        name="EditData"
        component={EditData}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
      />
      <Stack.Screen
        name="FAQ"
        component={FAQ}
      />
    </Stack.Navigator>
  )
}

export default MyAccountNav
