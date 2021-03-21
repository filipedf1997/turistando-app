import React, { forwardRef } from 'react'
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native'

const Content = forwardRef(({
  children, keyboardAvoidingProps, scrollViewProps, refreshControl,
}, ref) => (
  <KeyboardAvoidingView
    behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
    style={{ flex: 1 }}
    {...keyboardAvoidingProps}
  >
    <ScrollView
      keyboardShouldPersistTaps="handled"
      bounces={!!refreshControl}
      {...scrollViewProps}
      contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, ...scrollViewProps?.contentContainerStyle }}
      ref={ref}
      refreshControl={refreshControl}
    >
      {children}
    </ScrollView>
  </KeyboardAvoidingView>
))

export default Content
