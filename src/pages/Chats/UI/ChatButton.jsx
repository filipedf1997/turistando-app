import React from 'react'
import {
  View, StyleSheet, TouchableOpacity,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
  Text, useTheme,
} from 'react-native-paper'

const ChatButton = ({
  name, lastMessage, date, icon, action,
}) => {
  const { colors } = useTheme()

  return (
    <View>
      <TouchableOpacity style={styles.chat} onPress={action}>
        <MaterialCommunityIcons name="account-circle" size={50} color={colors.primary} />
        <View style={styles.nameWrapper}>
          <Text style={styles.name}>
            {name}
          </Text>
          <Text style={[styles.lastMessage, { color: colors.lightText }]}>
            {lastMessage}
          </Text>
        </View>
        <View style={styles.infosWrapper}>
          <Text style={[styles.date, { color: colors.lightText }]}>
            {date}
          </Text>
          <View style={[styles.iconWrapper, { backgroundColor: colors.orange }]}>
            {typeof icon === 'string'
              ? <Text style={[styles.numberIcon, { color: colors.white }]}>{icon}</Text>
              : icon}
          </View>
        </View>
      </TouchableOpacity>
      <View style={[styles.line, { borderColor: colors.primary }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  chat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  name: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lastMessage: {
    fontSize: 11,
  },
  infosWrapper: {
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 10,
    marginBottom: 10,
  },
  iconWrapper: {
    height: 18,
    width: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  numberIcon: {
    fontSize: 10,
    fontWeight: '500',
  },
  line: {
    marginVertical: 15,
    borderTopWidth: 0.7,
  },
})

export default ChatButton
