import React from 'react'
import { LogBox } from 'react-native'
import { Provider } from 'react-native-paper'
import * as Font from 'expo-font'
import moment from 'moment'
import BaseNavigator from './src/navigators/BaseNavigator'
import theme from './src/theme/theme'

LogBox.ignoreLogs([
  '[MobX]',
  'Setting a timer',
  'Failed prop type: Invalid prop `locale` of type `object` supplied to `GiftedChat`, expected `string`.',
  'Non-serializable values were found in the navigation state',
  'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
])

moment.defineLocale('pt-br', { weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sab'.split('_') })

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
