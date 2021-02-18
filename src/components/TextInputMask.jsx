import React from 'react'
import { TextInput as TextInputPaper } from 'react-native-paper'
import { TextInputMask as TextInputMasked } from 'react-native-masked-text'

const TextInputMask = (props) => (
  <TextInputMasked
    {...props}
    customTextInput={TextInputPaper}
    customTextInputProps={{
      style: [{ borderRadius: 5 }, props?.style],
      underlineColor: 'transparent',
      label: props.label,
      left: props.left,
    }}
  />
)

export default TextInputMask
