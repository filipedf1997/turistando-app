import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'

const CircleFirstLetter = ({ name }) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.blue }]}>
      <Text style={[styles.text, { color: colors.white }]}>
        {name.slice(0, 1)}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: RFValue(9),
  },
})

export default CircleFirstLetter
