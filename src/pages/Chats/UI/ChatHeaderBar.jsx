import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'

const ChatHeaderBar = ({ action, name, lastMessage }) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <TouchableOpacity onPress={action} style={styles.backButton}>
        <AntDesign name="arrowleft" size={30} color={colors.white} />
      </TouchableOpacity>
      <MaterialCommunityIcons name="account-circle" size={45} color={colors.white} />
      <View style={styles.nameWrapper}>
        <Text style={styles.name}>
          {name}
        </Text>
        <Text style={[styles.lastMessage, { color: colors.lightText }]}>
          {lastMessage}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  nameWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  name: {
    fontSize: 14,
    marginBottom: 5,
  },
  lastMessage: {
    fontSize: 11,
  },
})

export default ChatHeaderBar
