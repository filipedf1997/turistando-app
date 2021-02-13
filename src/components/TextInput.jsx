import React from 'react'
import { TextInput as TextInputPaper, useTheme } from 'react-native-paper'

const TextInput = (props) => {
  const { colors } = useTheme()

  return (
    <TextInputPaper
      underlineColor={colors.error}
      selectionColor={colors.primary}
      {...props}
    />
  )
}

export default TextInput
