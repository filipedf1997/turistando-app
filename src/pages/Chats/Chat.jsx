import React, { useState, useCallback, useEffect } from 'react'
import { Text } from 'react-native'
import { GiftedChat, Send } from 'react-native-gifted-chat'

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messagesText = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messagesText))
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={(messagesText) => onSend(messagesText)}
      user={{
        _id: 1,
      }}
      placeholder="Digite aqui"
      renderSend={(props) => <Send {...props}><Text>Enviar</Text></Send>}
    />
  )
}

export default Chat
