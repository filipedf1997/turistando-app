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
  useTheme,
} from 'react-native-paper'

import { TouchableOpacity } from 'react-native-gesture-handler'
import { useStores } from '../../hooks/useStores'
import SignInStore from './store/SignInStore'
import firebase, { db } from '../../firebase/firebaseConfig'
import {
  Container, Content, Button, TextInput,
} from '../../components'
import TuristandoLogo from '../../images/turistando-logo'
import Waves from '../../images/waves'

const Sign = observer(({ navigation }) => {
  const { userStore } = useStores()
  const [store] = useState(() => new SignInStore())
  const { colors } = useTheme()

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
    <Container>
      <Content scrollViewProps={{ contentContainerStyle: styles.container }}>
        <View style={styles.logoWrapper}>
          <TuristandoLogo width={160} height={150} />
        </View>
        <View>
          <TextInput
            label="Email"
            value={store.email}
            onChangeText={(text) => { store.email = text }}
            style={styles.marginB10}
            keyboardType="email-address"
            left={<TextInputPaper.Icon name="account" color={colors.primary} size={25} />}
          />
          <TextInput
            label="Senha"
            value={store.password}
            onChangeText={(text) => { store.password = text }}
            style={styles.marginB10}
            secureTextEntry
            left={<TextInputPaper.Icon name="lock" color={colors.primary} size={25} />}
          />
          <View
            style={[styles.checkWrapper, styles.marginB10]}
          >
            <Checkbox
              status={store.remember ? 'checked' : 'unchecked'}
              onPress={() => { store.remember = !store.remember }}
              color={colors.primary}
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
            style={styles.marginB10}
            onPress={handleSubmit}
            disabled={store.disable}
            loading={store.isFetching}
          >
            Entrar
          </Button>
          <View style={styles.bottomLinksWrapper}>
            <Text style={{ color: colors.lightText }}>
              Não tem uma conta?
            </Text>
            <TouchableOpacity onPress={() => {
              navigation.navigate('SignUp')
            }}
            >
              <Text style={[styles.bottomLinks, { color: colors.primary }]}>REGISTRE-SE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomLinksWrapper}>
            <Text style={{ color: colors.lightText }}>
              Esqueceu a senha?
            </Text>
            <TouchableOpacity onPress={() => {
              navigation.navigate('ForgotPassword')
            }}
            >
              <Text style={[styles.bottomLinks, { color: colors.primary }]}>Clique aqui!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Content>
      <Waves />
    </Container>
  )
})

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    flexGrow: 1,
    justifyContent: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
    marginVertical: 40,
  },
  marginB10: {
    marginBottom: 10,
  },
  checkWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  caption: {
    marginLeft: 10,
  },
  bottomLinksWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  bottomLinks: {
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
})

export default Sign
