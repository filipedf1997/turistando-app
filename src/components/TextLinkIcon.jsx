import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import { Entypo } from '@expo/vector-icons';

const TextLinkIcon = ({
  text, textLink, action, withoutIcon,
}) => {
  const { colors } = useTheme()

  return (
    <View style={styles.bottomLinksWrapper}>
      <Text style={[!withoutIcon && styles.text, { color: colors.lightText }]}>
        {text}
        {' '}
        <Text style={{ color: colors.primary }} onPress={action}>
          {textLink}
        </Text>
      </Text>
      {!withoutIcon && <Entypo name="chevron-right" size={30} color={colors.primary} />}
    </View>
  )
}

const styles = StyleSheet.create({
  bottomLinksWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    marginRight: 10,
  },
})

export default TextLinkIcon
