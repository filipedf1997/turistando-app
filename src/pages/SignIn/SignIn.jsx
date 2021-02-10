import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { StyleSheet, View, Alert } from 'react-native'
import {
  Text,
  TextInput,
  Button
} from 'react-native-paper'
import { useStores } from '../../hooks/useStores'
import SignInStore from './store/SignInStore'
import firebase, { db } from '../../firebase/firebaseConfig'

const Sign = observer(({ navigation }) => {
  const { userStore } = useStores()
  const [store] = useState(() => new SignInStore())

  async function handleSubmit() {
    const result = await store.login()
    if (result) {
      userStore.idToken = await firebase.auth().currentUser.getIdToken()
      userStore.user = result
    } else {
      Alert.alert(null, 'Houve um erro ao fazer o login. Tente novamente.')
    }
  }

  function verifyUser() {
    firebase.auth().onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        try {
          store.isFetching = true

          const user = await db.collection('users').doc(currentUser.uid).get()
          userStore.idToken = await firebase.auth().currentUser.getIdToken()
          userStore.user = user.data()

          store.isFetching = false
        } catch (error) {
          console.log(error)
          store.isFetching = false
        }
      }
    })
  }

  useEffect(() => {
    verifyUser()
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={[styles.title, styles.marginB20]}
        >
          Turistando
        </Text>
        <TextInput
          label="Email"
          value={store.email}
          onChangeText={(text) => { store.email = text }}
          style={styles.marginB5}
        />
        <TextInput
          label="Senha"
          value={store.password}
          onChangeText={(text) => { store.password = text }}
          style={styles.marginB20}
          secureTextEntry
        />
        <Button
          mode="contained"
          style={styles.marginB5}
          onPress={handleSubmit}
          disabled={store.disable}
          loading={store.isFetching}
        >
          Entrar
        </Button>
        <Button
          onPress={() => navigation.navigate('SignUp')}
        >
          Cadastre-se
        </Button>
        <Button
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          Esqueci a senha
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
    fontSize: 30,
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

export default Sign
