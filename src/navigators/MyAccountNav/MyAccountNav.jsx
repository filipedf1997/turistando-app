import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MyAccount from '../../pages/MyAccount/MyAccount'
import EditData from '../../pages/MyAccount/EditData'
import ChangePassword from '../../pages/MyAccount/ChangePassword'
import FAQ from '../../pages/MyAccount/FAQ'
import FAQAnswer from '../../pages/MyAccount/FAQAnswer'
import EditAddress from '../../pages/MyAccount/EditAddress'
import EditFinancialData from '../../pages/MyAccount/EditFinancialData'

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
        name="EditAddress"
        component={EditAddress}
      />
      <Stack.Screen
        name="EditFinancialData"
        component={EditFinancialData}
      />
      <Stack.Screen
        name="FAQ"
        component={FAQ}
      />
      <Stack.Screen
        name="FAQAnswer"
        component={FAQAnswer}
      />
    </Stack.Navigator>
  )
}

export default MyAccountNav
