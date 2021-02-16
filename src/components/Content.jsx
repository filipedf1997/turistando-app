import React from 'react'
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native'

const Content = ({ children, keyboardAvoidingProps, scrollViewProps }) => (
  <KeyboardAvoidingView
    keyboardVerticalOffset={(Platform.OS === 'ios') ? 0 : 20}
    behavior="padding"
    style={{ flex: 1 }}
    {...keyboardAvoidingProps}
  >
    <ScrollView
      keyboardShouldPersistTaps="handled"
      {...scrollViewProps}
      contentContainerStyle={[{ flexGrow: 1 }, scrollViewProps?.contentContainerStyle]}
    >
      {children}
    </ScrollView>
  </KeyboardAvoidingView>
)

export default Content
