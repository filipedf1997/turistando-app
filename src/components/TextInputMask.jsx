import React from 'react'
import { TextInput as TextInputPaper } from 'react-native-paper'
import { TextInputMask as TextInputMasked } from 'react-native-masked-text'

const TextInputMask = (props) => (
  <TextInputMasked
    mode="outlined"
    customTextInput={TextInputPaper}
    customTextInputProps={{
      style: [{ borderRadius: 5 }, props?.style],
      label: props.label,
      left: props.left,
    }}
    {...props}
  />
)

export default TextInputMask
