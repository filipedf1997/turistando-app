import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme, Text } from 'react-native-paper'

const TextLink = ({
  text, textLink, action, underline,
}) => {
  const { colors } = useTheme()

  return (
    <View style={styles.bottomLinksWrapper}>
      <Text style={{ color: colors.lightText }}>
        {text}
      </Text>
      <TouchableOpacity onPress={action}>
        <Text style={[styles.bottomLinks, { color: colors.primary, textDecorationLine: underline ? 'underline' : null }]}>
          {textLink}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomLinksWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  bottomLinks: {
    marginLeft: 5,
  },
})

export default TextLink
