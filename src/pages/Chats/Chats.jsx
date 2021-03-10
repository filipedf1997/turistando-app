import React, { useEffect } from 'react'
import {
  StyleSheet,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import {
  Text, useTheme,
} from 'react-native-paper'
import {
  Container, Content,
} from '../../components'
import ChatButton from './UI/ChatButton'

const Chats = ({ navigation }) => {
  const { colors } = useTheme()

  useEffect(() => {}, [])

  return (
    <Container>
      <Content>
        <Text
          style={[styles.title, { color: colors.primary }]}
        >
          Chat
        </Text>
        <ChatButton
          name="Suporte do Turistando"
          lastMessage="Fale conosco se precisar de ajuda!"
          date="Ontem"
          icon={<AntDesign name="pushpin" size={10} color={colors.white} style={{ transform: [{ rotateY: '180deg' }] }} />}
          action={() => navigation.navigate('Chat', { name: 'Suporte do Turistando', isSupport: true })}
        />
        <ChatButton
          name="Cliente 01 (Passeio de Buggy)"
          lastMessage="Você recebeu 2 novas mensagens"
          date="08:21"
          icon="2"
          action={() => navigation.navigate('Chat', { name: 'Cliente 01 (Passeio de Buggy)', isSupport: false })}
        />
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    marginTop: 45,
    marginBottom: 20,
  },
})

export default Chats
