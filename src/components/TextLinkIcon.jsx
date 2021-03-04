import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import { Entypo } from '@expo/vector-icons';

const TextLinkIcon = ({
  text, action,
}) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity onPress={action} style={styles.bottomLinksWrapper}>
      <Text style={[styles.text, { color: colors.orange }]}>
        {text}
      </Text>
      <Entypo name="chevron-right" size={25} color={colors.orange} style={{ marginRight: -8 }} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  bottomLinksWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    flex: 1,
    marginRight: 10,
  },
})

export default TextLinkIcon
