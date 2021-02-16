import React from 'react'
import { LogBox } from 'react-native'
import { Provider } from 'react-native-paper'
import * as Font from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import BaseNavigator from './src/navigators/BaseNavigator'
import theme from './src/theme/theme'

LogBox.ignoreLogs(['[MobX]', 'Setting a timer'])

export default function App() {
  const [loaded] = Font.useFonts({
    // 'DMSans-Regular': require('./assets/fonts/DMSans-Regular.ttf'),
  })
  if (!loaded) return null

  return (
    <Provider theme={theme}>
      <BaseNavigator />
      <StatusBar hidden />
    </Provider>
  )
}
