import React, { useState, useCallback, useEffect } from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import {
  GiftedChat, Send, Bubble, Time,
} from 'react-native-gifted-chat'
import { Ionicons } from '@expo/vector-icons'
import pt from 'dayjs/locale/pt-br'
import ChatHeaderBar from './UI/ChatHeaderBar'

const messageSupport = [
  {
    _id: 1,
    text: 'Olá! Em que posso lhe ajudar?',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Suporte do Turistando',
      avatar: () => null,
    },
  },
]

const messageClient = [
  {
    _id: 1,
    text: 'Gostaria de saber mais sobre o passeio, por favor',
    createdAt: new Date(),
    user: {
      _id: 3,
      name: 'Suporte do Turistando',
      avatar: () => null,
    },
  },
  {
    _id: 2,
    text: 'Olá! Tudo bem?',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Suporte do Turistando',
      avatar: () => null,
    },
  },
]

const Chat = ({ navigation, route }) => {
  const { name, isSupport } = route.params
  const [messages, setMessages] = useState([])
  const { colors } = useTheme()

  useEffect(() => {
    setMessages(isSupport ? messageSupport : messageClient)
  }, [])

  const onSend = useCallback((messagesText = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messagesText))
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <ChatHeaderBar
        action={navigation.goBack}
        name={name}
        lastMessage="Online"
      />
      <GiftedChat
        keyboardShouldPersistTaps="handled"
        locale={pt}
        alwaysShowSend
        messages={messages}
        onSend={(messagesText) => onSend(messagesText)}
        user={{
          _id: 1,
        }}
        placeholder="Digite aqui..."
        renderSend={(props) => (
          <Send {...props}>
            <Ionicons name="arrow-forward-circle" size={40} color={colors.primary} />
          </Send>
        )}
        renderBubble={(props) => (
          <Bubble
            {...props}
            textStyle={{
              right: {
                color: '#000',
              },
              left: {
                color: '#000',
              },
            }}
            wrapperStyle={{
              right: {
                backgroundColor: colors.whiteChat,
              },
              left: {
                backgroundColor: colors.orangeChat,
              },
            }}
          />
        )}
        renderTime={(props) => (
          <Time
            {...props}
            timeTextStyle={{
              right: { color: '#000' },
              left: { color: '#000' },
            }}
          />
        )}
        textInputStyle={{
          backgroundColor: colors.whiteChat,
          margin: 10,
          borderRadius: 10,
          paddingTop: 5,
        }}
      />
    </View>
  )
}

export default Chat
