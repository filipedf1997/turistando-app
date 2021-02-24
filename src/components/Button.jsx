import React from 'react'
import { Button as ButtonPaper, useTheme } from 'react-native-paper'

const Button = ({ children, ...props }) => {
  const { colors } = useTheme()

  return (
    <ButtonPaper
      color={colors.primary}
      uppercase={false}
      contentStyle={{ height: 45 }}
      labelStyle={{ fontSize: 16, fontWeight: '500' }}
      {...props}
    >
      {children}
    </ButtonPaper>
  )
}

export default Button
