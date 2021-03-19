import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { s, vs } from 'react-native-size-matters'

const CircleFirstLetter = ({ name }) => {
  const { colors } = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <Text style={[styles.text, { color: colors.white }]}>
        {name.slice(0, 1)}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    width: s(14),
    height: vs(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: RFValue(9),
  },
})

export default CircleFirstLetter
