import { DefaultTheme, configureFonts } from 'react-native-paper'
import fontConfig from './fonts'
// import { RFValue } from 'react-native-responsive-fontsize'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    black: '#000',
    white: '#FFF',
  },
  fonts: configureFonts(fontConfig),
  // fontSizes: { font24: RFValue(24),}
}

export default theme
