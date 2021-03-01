import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet, View, TouchableWithoutFeedback, Dimensions, Keyboard, Platform,
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
import TuristandoLogo from '../../images/turistando-logo'
import Waves from '../../images/waves'

const originalWidth = 360
const originalHeight = 110
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
      () => {
        if (Platform.OS === 'android') store.wavesVisibility = false
        scrollView.current.scrollToEnd()
      },
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => { if (Platform.OS === 'android') store.wavesVisibility = true },
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  return (
    <Container>
      <Content scrollViewProps={{ contentContainerStyle: styles.container }} ref={scrollView}>
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
            style={styles.marginB10}
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
            underline
          />
          <TextLink
            text="Esqueceu a senha?"
            textLink="Clique aqui!"
            action={() => navigation.navigate('ForgotPassword')}
            underline
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

      {store.wavesVisibility && (
      <View style={{ width: windowWidth, aspectRatio }}>
        <Waves
          width="100%"
          height="100%"
          viewBox={`0 0 ${originalWidth} ${originalHeight}`}
        />
      </View>
      )}
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
})

export default Sign
