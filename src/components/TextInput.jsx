import React from 'react'
import { TextInput as TextInputPaper } from 'react-native-paper'

const TextInput = (props) => (
  <TextInputPaper
    underlineColor="transparent"
    {...props}
    style={[{ borderRadius: 5 }, props?.style]}
  />
)

export default TextInput
