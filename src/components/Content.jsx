import React, { forwardRef } from 'react'
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native'

const Content = forwardRef(({ children, keyboardAvoidingProps, scrollViewProps }, ref) => (
  <KeyboardAvoidingView
    keyboardVerticalOffset={(Platform.OS === 'ios') ? 0 : 20}
    behavior={(Platform.OS === 'ios') ? 'padding' : null}
    style={{ flex: 1 }}
    {...keyboardAvoidingProps}
  >
    <ScrollView
      keyboardShouldPersistTaps="handled"
      {...scrollViewProps}
      contentContainerStyle={[{ flexGrow: 1 }, scrollViewProps?.contentContainerStyle]}
      ref={ref}
    >
      {children}
    </ScrollView>
  </KeyboardAvoidingView>
))

export default Content
