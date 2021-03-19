import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import TuristandoLogoBar from '../images/turistando-logo-bar'

const HeaderBarLogo = ({ action, withFilter }) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { borderColor: colors.whiteGray, backgroundColor: colors.background }]}>
      <TuristandoLogoBar />
      {withFilter && (
      <TouchableOpacity
        style={[styles.filterWrapper, { backgroundColor: colors.black }]}
        onPress={action}
      >
        <Ionicons name="ios-options-outline" size={21} color={colors.background} />
      </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterWrapper: {
    borderRadius: 6,
    paddingHorizontal: 2,
  },
})

export default HeaderBarLogo
