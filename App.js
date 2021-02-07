import React from 'react'
import {LogBox} from 'react-native'
import BaseNavigator from './src/navigators/BaseNavigator'

LogBox.ignoreLogs(['[MobX]','Setting a timer'])

export default function App() {
  return (
    <BaseNavigator />
  )
}
