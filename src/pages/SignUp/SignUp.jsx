import React, { useState } from 'react'
import { observer } from 'mobx-react'
import {
  Alert,
  StyleSheet,
  View,
  TouchableWithoutFeedback
} from 'react-native'
import {
  Text,
  TextInput,
  Button,
  Checkbox,
  Caption,
} from 'react-native-paper'
import SignUpStore from './store/SignUpStore'

const SignUp = observer(({ navigation }) => {
  const [store] = useState(() => new SignUpStore())

  async function handleSubmit() {
    const result = await store.createUser()
    if (result) {
      Alert.alert(
        null,
        "Você foi cadastrado com sucesso!",
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('SignIn')
          },
        ],
        { cancelable: false }
      )
    } else {
      Alert.alert(null, "Houve um erro ao lhe cadastrar. Tente novamente.")
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={[styles.title, styles.marginB20]}
        >
          Cadastro
        </Text>
        <TextInput
          label="Nome"
          value={store.user.name}
          onChangeText={text => store.user.name = text}
          style={styles.marginB5}
        />
        <TextInput
          label="Email"
          value={store.user.email}
          onChangeText={text => store.user.email = text}
          style={styles.marginB5}
        />
        {(store.user.email !== "" && !store.user.email.includes('@') || !store.user.email.includes('.')) &&
          <Caption style={{ color: "#aa3737" }}>
            Email inválido!
          </Caption>}
        <TextInput
          label="Telefone"
          value={store.user.fone}
          onChangeText={text => store.user.fone = text}
          style={styles.marginB5}
        />
        <TextInput
          label="Senha"
          value={store.user.password}
          onChangeText={text => store.user.password = text}
          style={styles.marginB5}
          secureTextEntry
        />
        {(store.user.password !== '' && store.user.password.length < 6) &&
          <Caption style={{ color: "#aa3737" }}>
            A senha precisa conter no mínino 6 dígitos!
          </Caption>}
        <TextInput
          label="Confirmar senha"
          value={store.user.confirmPassword}
          onChangeText={text => store.user.confirmPassword = text}
          style={styles.marginB5}
          secureTextEntry
        />
        {(store.user.confirmPassword !== '' && store.user.password !== store.user.confirmPassword) &&
          <Caption style={{ color: "#aa3737" }}>
            As senhas estão diferentes!
          </Caption>}
        <View style={[styles.checkWrapper, store.user.isProvider ? styles.marginB5 : styles.marginB20]}>
          <Checkbox
            status={store.user.isProvider ? 'checked' : 'unchecked'}
            onPress={() => { store.user.isProvider = !store.user.isProvider }}
          />
          <TouchableWithoutFeedback onPress={() => { store.user.isProvider = !store.user.isProvider }}>
            <Caption style={styles.caption}>
              Marque esta opção se for prestador de serviços
            </Caption>
          </TouchableWithoutFeedback>
        </View>
        {store.user.isProvider &&
          <TextInput
            label="Descreva aqui seu perfil"
            value={store.user.profile}
            onChangeText={text => store.user.profile = text}
            style={styles.marginB20}
            multiline
            numberOfLines={4}
          />
        }
        <Button
          mode='contained'
          onPress={handleSubmit}
          style={styles.marginB5}
          disabled={store.disable}
          loading={store.isFetching}
        >
          Cadastrar
        </Button>
        <Button
          onPress={() => navigation.navigate('SignIn')}
        >
          Voltar
        </Button>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    color: '#5602e6',
    textAlign: 'center'
  },
  marginB20: {
    marginBottom: 30
  },
  marginB5: {
    marginBottom: 5
  },
  checkWrapper: {
    flexDirection: 'row'
  },
  caption: {
    marginLeft: 10
  }
})

export default SignUp
