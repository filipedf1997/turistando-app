import React from 'react'
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native'

const Content = ({ children, keyboardAvoidingProps, scrollViewProps }) => (
  <KeyboardAvoidingView
    keyboardVerticalOffset={(Platform.OS === 'ios') ? 0 : 20}
    behavior={(Platform.OS === 'ios') ? 'padding' : null}
    style={{ flex: 1 }}
    {...keyboardAvoidingProps}
  >
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  </KeyboardAvoidingView>
)

export default Content
