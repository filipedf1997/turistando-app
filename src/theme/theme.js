import { DefaultTheme, configureFonts } from 'react-native-paper'
import fontConfig from './fonts'
// import { RFValue } from 'react-native-responsive-fontsize'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0A55A2',
    orange: '#DC4D04',
    blue: '#2093FA',
    error: '#E11',
    black: '#414141',
    white: '#F8F8F8',
    background: '#FFFFFF',
    whiteGray: '#ECECEC',
    lightText: '#414141',
    green: '#109D5A',
    darkGreen: '#037740',
    borderTabColor: '#7B7B7B',
    blueChat: '#A3DEF5',
    whiteChat: '#F2F7FF',
  },
  fonts: configureFonts(fontConfig),
  // fontSizes: { font24: RFValue(24),}
}

export default theme
