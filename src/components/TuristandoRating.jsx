import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { s, vs } from 'react-native-size-matters'

const TuristandoRating = ({
  isActive, value, action,
}) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      style={[styles.button, isActive ? { backgroundColor: colors.primary } : { borderWidth: 0.6 }]}
      onPress={action}
    >
      <Text style={{ fontSize: RFValue(12), color: isActive ? colors.white : colors.lightText }}>
        {value}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: s(24),
    height: vs(25),
    borderRadius: 20,
  },
})

export default TuristandoRating
