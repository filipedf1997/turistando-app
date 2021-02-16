import React, { useState } from 'react'
import { observer } from 'mobx-react'
import {
  Alert,
  StyleSheet,
  View,
} from 'react-native'
import {
  Text,
  Caption,
  useTheme,
  Switch,
  TextInput as TextInputPaper,
} from 'react-native-paper'
import {
  Container,
  Content,
  Button,
  TextInput,
  HeaderBar,
} from '../../components'
import SignUpStore from './store/SignUpStore'
import Waves from '../../images/waves'

const SignUp = observer(({ navigation }) => {
  const [store] = useState(() => new SignUpStore())
  const { colors } = useTheme()

  async function handleSubmit() {
    const result = await store.createUser()
    if (result) {
      Alert.alert(
        null,
        'Você foi cadastrado com sucesso!',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('SignIn'),
          },
        ],
        { cancelable: false },
      )
    } else {
      Alert.alert(null, 'Houve um erro ao lhe cadastrar. Tente novamente.')
    }
  }

  return (
    <Container>
      <HeaderBar onPress={() => navigation.navigate('SignIn')} />
      <Content scrollViewProps={{ contentContainerStyle: styles.container }}>
        <Text
          style={[styles.title, { color: colors.primary }]}
        >
          Criar uma conta
        </Text>
        <TextInput
          label="Nome"
          value={store.user.name}
          onChangeText={(text) => { store.user.name = text }}
          style={styles.marginB10}
          left={<TextInputPaper.Icon name="account" color={colors.primary} size={25} />}
        />
        <TextInput
          label="Email"
          value={store.user.email}
          onChangeText={(text) => { store.user.email = text }}
          style={styles.marginB10}
          left={<TextInputPaper.Icon name="email" color={colors.primary} size={25} />}
        />
        {(store.user.email !== '' && (!store.user.email.includes('@') || !store.user.email.includes('.')))
          && (
          <Caption style={{ color: '#aa3737' }}>
            Email inválido!
          </Caption>
          )}
        <TextInput
          label="Telefone"
          value={store.user.fone}
          onChangeText={(text) => { store.user.fone = text }}
          style={styles.marginB10}
          left={<TextInputPaper.Icon name="phone-in-talk" color={colors.primary} size={25} />}
        />
        <TextInput
          label="Senha"
          value={store.user.password}
          onChangeText={(text) => { store.user.password = text }}
          style={styles.marginB10}
          secureTextEntry
          left={<TextInputPaper.Icon name="lock" color={colors.primary} size={25} />}
        />
        {(store.user.password !== '' && store.user.password.length < 6)
          && (
          <Caption style={{ color: '#aa3737' }}>
            A senha precisa conter no mínino 6 dígitos!
          </Caption>
          )}
        <TextInput
          label="Confirmar senha"
          value={store.user.confirmPassword}
          onChangeText={(text) => { store.user.confirmPassword = text }}
          style={styles.marginB10}
          secureTextEntry
          left={<TextInputPaper.Icon name="lock" color={colors.primary} size={25} />}
        />
        {(store.user.confirmPassword !== '' && store.user.password !== store.user.confirmPassword)
          && (
          <Caption style={{ color: '#aa3737' }}>
            As senhas estão diferentes!
          </Caption>
          )}
        <View
          style={[styles.checkWrapper, styles.marginB10]}
        >
          <Switch
            color={colors.primary}
            value={store.user.isProvider}
            onValueChange={() => { store.user.isProvider = !store.user.isProvider }}
          />
          <Caption style={styles.caption}>
            Selecione se for prestador de serviços
          </Caption>
        </View>
        {store.user.isProvider
          && (
          <TextInput
            label="Descreva aqui seu perfil"
            value={store.user.profile}
            onChangeText={(text) => { store.user.profile = text }}
            style={styles.marginB20}
            multiline
            numberOfLines={3}
          />
          )}
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.marginB10}
          disabled={store.disable}
          loading={store.isFetching}
        >
          Registrar
        </Button>
      </Content>
      <Waves />
    </Container>
  )
})

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    marginVertical: 20,
  },
  marginB20: {
    marginBottom: 20,
  },
  marginB10: {
    marginBottom: 10,
  },
  checkWrapper: {
    flexDirection: 'row',
  },
  caption: {
    flex: 1,
    marginLeft: 10,
  },
})

export default SignUp
