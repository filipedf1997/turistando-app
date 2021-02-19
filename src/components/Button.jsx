import React from 'react'
import { Button as ButtonPaper, useTheme } from 'react-native-paper'

const Button = ({ children, ...props }) => {
  const { colors } = useTheme()

  return (
    <ButtonPaper
      color={colors.primary}
      {...props}
    >
      {children}
    </ButtonPaper>
  )
}

export default Button