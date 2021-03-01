import React from 'react'
import { LogBox } from 'react-native'
import { Provider } from 'react-native-paper'
import * as Font from 'expo-font'
import BaseNavigator from './src/navigators/BaseNavigator'
import theme from './src/theme/theme'

LogBox.ignoreLogs(['[MobX]', 'Setting a timer', 'Failed prop type: Invalid prop `locale` of type `object` supplied to `GiftedChat`, expected `string`.'])

export default function App() {
  const [loaded] = Font.useFonts({
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  })
  if (!loaded) return null

  return (
    <Provider theme={theme}>
      <BaseNavigator />
    </Provider>
  )
}
