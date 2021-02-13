import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet, View, Alert, TouchableWithoutFeedback,
} from 'react-native'
import {
  Text,
  TextInput as TextInputPaper,
  Checkbox,
  Caption,
} from 'react-native-paper'
import { useStores } from '../../hooks/useStores'
import SignInStore from './store/SignInStore'
import firebase, { db } from '../../firebase/firebaseConfig'
import Button from '../../components/Buttom'
import TextInput from '../../components/TextInput'

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

  function verifyLoggedUser() {
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
    verifyLoggedUser()
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
          keyboardType="email-address"
          left={<TextInputPaper.Icon name="account" color="#c3c" size={25} />}
        />
        <TextInput
          label="Senha"
          value={store.password}
          onChangeText={(text) => { store.password = text }}
          style={styles.marginB5}
          secureTextEntry
          left={<TextInputPaper.Icon name="lock" color="#c3c" size={25} />}
        />
        <View
          style={[styles.checkWrapper, styles.marginB20]}
        >
          <Checkbox
            status={store.remember ? 'checked' : 'unchecked'}
            onPress={() => { store.remember = !store.remember }}
          />
          <TouchableWithoutFeedback
            onPress={() => { store.remember = !store.remember }}
          >
            <Caption style={styles.caption}>
              Lembrar-me
            </Caption>
          </TouchableWithoutFeedback>
        </View>
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    color: '#5602e6',
    textAlign: 'center',
  },
  marginB20: {
    marginBottom: 30,
  },
  marginB5: {
    marginBottom: 5,
  },
  checkWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  caption: {
    marginLeft: 10,
  },
})

export default Sign
