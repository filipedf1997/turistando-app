import React from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'

const Container = ({ children, ...props }) => {
  const { colors } = useTheme()

  return (
    <View style={[{ height: '100%', backgroundColor: colors.background }]} {...props}>
      {children}
    </View>
  )
}

export default Container
