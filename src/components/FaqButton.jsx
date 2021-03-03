import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import { Entypo } from '@expo/vector-icons'

const FaqButton = ({
  text, action,
}) => {
  const { colors } = useTheme()

  return (
    <View>
      <TouchableOpacity onPress={action}>
        <View style={styles.wrapper}>
          <Text style={[styles.text, { color: colors.lightText }]}>
            {text}
          </Text>
          <Entypo name="chevron-right" size={30} color={colors.primary} />
        </View>
      </TouchableOpacity>
      <View style={[styles.line, { borderTopColor: colors.lightText }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    marginRight: 10,
  },
  line: {
    marginHorizontal: 2,
    marginTop: 7,
    marginBottom: 25,
    borderTopWidth: 0.5,
  },
})

export default FaqButton
