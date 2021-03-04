import React from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet,
} from 'react-native'
import {
  Text, useTheme, TextInput as TextInputPaper,
} from 'react-native-paper'
import {
  Container, Content, TextInput, TextInputMask, TextLinkIcon, TextLink,
} from '../../components'
import { useStores } from '../../hooks/useStores'

const MyAccount = observer(({ navigation }) => {
  const { userStore } = useStores()
  const { colors } = useTheme()

  return (
    <Container>
      <Content scrollViewProps={{ contentContainerStyle: styles.container }}>
        <Text
          style={[styles.title, { color: colors.primary }]}
        >
          Minha conta
        </Text>
        <TextInput
          disabled
          value={userStore.user.name}
          style={styles.marginB10}
          left={<TextInputPaper.Icon name="account" color={colors.primary} size={25} />}
        />
        <TextInput
          disabled
          mode="flat"
          value={userStore.user.email}
          style={styles.marginB10}
          keyboardType="email-address"
          left={<TextInputPaper.Icon name="email" color={colors.primary} size={25} />}
        />
        <TextInputMask
          type="cel-phone"
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) ',
          }}
          disabled
          value={userStore.user.fone}
          style={styles.marginB10}
          left={<TextInputPaper.Icon name="phone-in-talk" color={colors.primary} size={25} />}
        />
        {userStore.user.isProvider
          && (
          <TextInput
            disabled
            value={userStore.user.profile}
            style={styles.marginB10}
            multiline
            numberOfLines={3}
          />
          )}
        <TextLinkIcon
          text="Clique aqui para alterar seus dados"
          action={() => navigation.navigate('EditData')}
        />
        <Text
          style={[styles.subTitle, { color: colors.primary }]}
        >
          Segurança
        </Text>
        <TextInput
          disabled
          value="*********"
          style={styles.marginB10}
          secureTextEntry
          left={<TextInputPaper.Icon name="lock" color={colors.primary} size={25} />}
        />
        <TextLinkIcon
          text="Clique aqui para alterar a sua senha"
          action={() => navigation.navigate('ChangePassword')}
        />
        <Text
          style={[styles.subTitle, { color: colors.primary }]}
        >
          FAQ
        </Text>
        <TextLink
          text="Tem alguma dúvida sobre o Turistando? Acesse a nossa página de"
          textLink="Perguntas Frequentes"
          action={() => navigation.navigate('FAQ')}
        />
      </Content>
    </Container>
  )
})

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  title: {
    fontSize: 25,
    marginTop: 45,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 25,
    marginTop: 15,
    marginBottom: 15,
  },
  marginB20: {
    marginBottom: 20,
  },
  marginB10: {
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  email: {
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
})

export default MyAccount
