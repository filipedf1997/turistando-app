import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet, View, TouchableWithoutFeedback, Dimensions, Keyboard, Image,
} from 'react-native'
import {
  TextInput as TextInputPaper, Checkbox, Caption, useTheme,
} from 'react-native-paper'
import { useStores } from '../../hooks/useStores'
import SignInStore from './store/SignInStore'
import firebase, { db } from '../../firebase/firebaseConfig'
import {
  Container, Content, Button, TextInput, ModalFeedback, TextLink,
} from '../../components'
import Waves from '../../images/waves'

const originalWidth = 360
const originalHeight = 90
const aspectRatio = originalWidth / originalHeight
const windowWidth = Dimensions.get('screen').width

const Sign = observer(({ navigation }) => {
  const { userStore } = useStores()
  const [store] = useState(() => new SignInStore())
  const { colors } = useTheme()
  const scrollView = useRef(null)

  async function handleSubmit() {
    const result = await store.login()
    if (result) {
      userStore.idToken = await firebase.auth().currentUser.getIdToken()
      userStore.user = result
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

          if (!currentUser.displayName) {
            await currentUser.updateProfile({ displayName: userStore.user.name })
          }

          store.isFetching = false
        } catch (error) {
          store.isFetching = false
        }
      }
    })
  }

  useEffect(() => {
    verifyLoggedUser()
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => { scrollView.current.scrollToEnd() },
    )

    return () => {
      keyboardDidShowListener.remove()
    }
  }, [])

  return (
    <Container>
      <Content scrollViewProps={{ contentContainerStyle: styles.container }} ref={scrollView}>
        <View style={styles.logoWrapper}>
          <Image source={require('../../images/logo.png')} style={{ width: 160, height: 160 }} />
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
            secureTextEntry={!store.passwordVisible}
            left={<TextInputPaper.Icon name="lock" color={colors.primary} size={25} />}
            right={(
              <TextInputPaper.Icon
                onPress={() => { store.passwordVisible = !store.passwordVisible }}
                name={store.passwordVisible ? 'eye' : 'eye-off'}
                color={colors.borderTabColor}
                size={23}
              />
            )}
          />
          <View
            style={styles.checkWrapper}
          >
            <Checkbox.Android
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
            style={styles.marginB20}
            onPress={handleSubmit}
            disabled={store.disable}
            loading={store.isFetching}
          >
            Entrar
          </Button>
          <TextLink
            text="Não tem uma conta?"
            textLink="REGISTRE-SE"
            action={() => navigation.navigate('SignUp')}
          />
          <TextLink
            text="Esqueceu a senha?"
            textLink="Clique aqui!"
            action={() => navigation.navigate('ForgotPassword')}
          />
        </View>
      </Content>

      <ModalFeedback
        visible={store.requestFeedback.error}
        message={store.requestFeedback.message}
        btnName={store.requestFeedback.btnName}
        error={store.requestFeedback.error}
        onPress={store.requestFeedback.onPress}
      />

      <View style={{ width: windowWidth, aspectRatio }}>
        <Waves
          width="100%"
          height="100%"
          viewBox={`0 0 ${originalWidth} ${originalHeight}`}
        />
      </View>
    </Container>
  )
})

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 60,
  },
  marginB10: {
    marginBottom: 10,
  },
  marginB20: {
    marginBottom: 25,
  },
  checkWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -6,
    marginVertical: 5,
  },
  caption: {
    marginLeft: 10,
  },
})

export default Sign
