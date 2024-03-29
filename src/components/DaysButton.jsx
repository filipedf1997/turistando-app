import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme, Text } from 'react-native-paper'

const DaysButton = ({
  isActive, value, action, disabled,
}) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      style={[styles.button, isActive ? { backgroundColor: disabled ? colors.black : colors.primary } : { borderWidth: 1 }]}
      onPress={action}
      disabled={disabled}
    >
      <Text style={{ fontSize: 12, color: isActive ? colors.white : colors.lightText }}>
        {value}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingVertical: 10,
    width: 37,
    borderRadius: 7,
  },
})

export default DaysButton
