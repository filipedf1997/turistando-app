import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import TuristandoLogoBar from '../images/turistando-logo-bar'

const HeaderBarLogo = () => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { borderColor: colors.borderTabColor }]}>
      <TuristandoLogoBar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
})

export default HeaderBarLogo
