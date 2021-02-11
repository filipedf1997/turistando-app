import React, { useEffect } from 'react'
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native'

const Chats = ({ navigation }) => {
  useEffect(() => {}, [])

  return (
    <View style={styles.container}>
      <Text>Chats</Text>
      <TouchableOpacity style={styles.chat} onPress={() => navigation.navigate('Chat')}>
        <View style={styles.avatar}>
          <Text>
            F
          </Text>
        </View>
        <Text>Pessoa</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  chat: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: '#c2c2c2',
    borderRadius: 3,
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#88b8ff',
    borderRadius: 30,
    marginRight: 20,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Chats
