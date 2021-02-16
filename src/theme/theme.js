import { DefaultTheme, configureFonts } from 'react-native-paper'
import fontConfig from './fonts'
// import { RFValue } from 'react-native-responsive-fontsize'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EB5A10',
    black: '#000',
    white: '#FFF',
    background: '#E5E5E5',
    lightText: '#414141',
  },
  fonts: configureFonts(fontConfig),
  // fontSizes: { font24: RFValue(24),}
}

export default theme
