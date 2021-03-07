import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'

const EmptyImage = () => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { borderColor: colors.placeholder }]}>
      <MaterialIcons name="image-search" size={150} color={colors.primary} style={styles.icon} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 160,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
  },
  icon: {
    opacity: 0.7,
  },
})

export default EmptyImage
