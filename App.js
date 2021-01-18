import React from 'react'
import {LogBox} from 'react-native'
import BaseNavigator from './src/navigators/BaseNavigator'

LogBox.ignoreLogs(['[MobX]'])

export default function App() {
  return (
    <BaseNavigator />
  )
}
