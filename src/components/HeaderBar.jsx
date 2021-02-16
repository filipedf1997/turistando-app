import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons'

const HeaderBar = ({ onPress }) => {
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <AntDesign name="arrowleft" size={30} color={colors.primary} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: 'row',
  },
})

export default HeaderBar
