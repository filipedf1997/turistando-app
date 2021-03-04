import { DefaultTheme, configureFonts } from 'react-native-paper'
import fontConfig from './fonts'
// import { RFValue } from 'react-native-responsive-fontsize'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0A55A2',
    orange: '#EB5A10',
    blue: '#2093FA',
    error: '#E11',
    black: '#000',
    white: '#FFF',
    background: '#FFFFFF',
    whiteGray: '#E5E5E5',
    lightText: '#414141',
    green: '#30E204',
    borderTabColor: '#7B7B7B',
    blueChat: '#A3DEF5',
    whiteChat: '#F2F7FF',
  },
  fonts: configureFonts(fontConfig),
  // fontSizes: { font24: RFValue(24),}
}

export default theme
