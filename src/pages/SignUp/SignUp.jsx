import React, { useState } from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet, View, Dimensions,
} from 'react-native'
import {
  Text, Caption, useTheme, Switch, TextInput as TextInputPaper,
} from 'react-native-paper'
import {
  Container, Content, Button, TextInput, HeaderBar, ModalFeedback, TextInputMask,
} from '../../components'
import SignUpStore from './store/SignUpStore'
import Waves from '../../images/waves'

const originalWidth = 360
const originalHeight = 90
const aspectRatio = originalWidth / originalHeight
const windowWidth = Dimensions.get('screen').width

const SignUp = observer(({ navigation }) => {
  const [store] = useState(() => new SignUpStore())
  const { colors } = useTheme()

  async function handleSubmit() {
    const result = await store.createUser()
    if (result) {
      store.requestFeedback = {
        visible: true,
        error: false,
        message: 'Seu cadastro foi realizado com sucesso!',
        onPress: () => {
          store.requestFeedback.visible = false
          navigation.navigate('SignIn')
        },
        btnName: 'Ir para Login',
      }
    }
  }

  return (
    <Container>
      <HeaderBar onPress={() => navigation.navigate('SignIn')} />
      <Content scrollViewProps={{ contentContainerStyle: styles.container }}>
        <Text
          style={[styles.title, { color: colors.primary }]}
        >
          Criar conta
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
          keyboardType="email-address"
          error={store.errorEmail}
          left={<TextInputPaper.Icon name="email" color={store.errorEmail ? colors.error : colors.primary} size={25} />}
        />
        {store.errorEmail
          && (
          <Caption style={[styles.errorMessages, { color: colors.error }]}>
            Digite um e-mail válido!
          </Caption>
          )}
        <TextInputMask
          type="cel-phone"
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) ',
          }}
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
          secureTextEntry={!store.passwordVisible}
          error={store.errorPassword}
          left={<TextInputPaper.Icon name="lock" color={store.errorPassword ? colors.error : colors.primary} size={25} />}
          right={(
            <TextInputPaper.Icon
              onPress={() => { store.passwordVisible = !store.passwordVisible }}
              name={store.passwordVisible ? 'eye' : 'eye-off'}
              color={colors.gray}
              size={23}
            />
          )}
        />
        {store.errorPassword
          && (
          <Caption style={[styles.errorMessages, { color: colors.error }]}>
            A senha precisa conter no mínino 6 dígitos!
          </Caption>
          )}
        <TextInput
          label="Confirmar senha"
          value={store.user.confirmPassword}
          onChangeText={(text) => { store.user.confirmPassword = text }}
          style={styles.marginB10}
          secureTextEntry={!store.passwordVisible}
          error={store.errorConfirmPassword}
          left={<TextInputPaper.Icon name="lock" color={store.errorConfirmPassword ? colors.error : colors.primary} size={25} />}
          right={(
            <TextInputPaper.Icon
              onPress={() => { store.passwordVisible = !store.passwordVisible }}
              name={store.passwordVisible ? 'eye' : 'eye-off'}
              color={colors.gray}
              size={23}
            />
          )}
        />
        {store.errorConfirmPassword
          && (
          <Caption style={[styles.errorMessages, { color: colors.error }]}>
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
          <Caption style={styles.switchLabel}>
            Você é um prestador de serviço?
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

      <ModalFeedback
        visible={store.requestFeedback.visible}
        message={store.requestFeedback.message}
        btnName={store.requestFeedback.btnName}
        error={store.requestFeedback.error}
        success={!store.requestFeedback.error}
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
  switchLabel: {
    flex: 1,
    marginLeft: 10,
  },
  errorMessages: {
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 10,
  },
})

export default SignUp
