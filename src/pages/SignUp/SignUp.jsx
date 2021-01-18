import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { Alert, StyleSheet, View } from 'react-native'
import {
  Text,
  TextInput,
  Button
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
        <TextInput
          label="Senha"
          value={store.user.password}
          onChangeText={text => store.user.password = text}
          style={styles.marginB20}
          secureTextEntry
        />
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
  }
})

export default SignUp
