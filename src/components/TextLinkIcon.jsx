import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import { Entypo } from '@expo/vector-icons';

const TextLinkIcon = ({
  text, textLink, action,
}) => {
  const { colors } = useTheme()

  return (
    <View style={styles.bottomLinksWrapper}>
      <Text style={{ color: colors.lightText }}>
        {text}
      </Text>
      <TouchableOpacity onPress={action}>
        <Text style={[styles.bottomLinks, { color: colors.primary }]}>
          {textLink}
        </Text>
      </TouchableOpacity>
      <Entypo name="chevron-right" size={30} color={colors.primary} style={styles.icon} />
    </View>
  )
}

const styles = StyleSheet.create({
  bottomLinksWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  bottomLinks: {
    marginLeft: 5,
  },
  icon: {
    marginLeft: 10,
    alignSelf: 'flex-end',
  },
})

export default TextLinkIcon
