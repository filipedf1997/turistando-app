import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme, Text } from 'react-native-paper'

const TextLink = ({
  text, textLink, action, underline,
}) => {
  const { colors } = useTheme()

  return (
    <View style={styles.bottomLinksWrapper}>
      <Text style={{ color: colors.lightText }}>
        {text}
        {' '}
        <Text onPress={action} style={{ color: colors.primary, textDecorationLine: underline ? 'underline' : null }}>
          {textLink}
        </Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomLinksWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
})

export default TextLink
