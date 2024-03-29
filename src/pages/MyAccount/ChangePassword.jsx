import React, { useState } from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet,
} from 'react-native'
import {
  Text, useTheme, TextInput as TextInputPaper, Caption,
} from 'react-native-paper'
import {
  Container, Content, Button, TextInput, HeaderBar, ModalFeedback,
} from '../../components'
import MyAccountStore from './store/MyAccountStore'

const ChangePassword = observer(({ navigation }) => {
  const [store] = useState(() => new MyAccountStore())
  const { colors } = useTheme()

  return (
    <Container>
      <HeaderBar onPress={navigation.goBack} />
      <Content>
        <Text
          style={[styles.title, { color: colors.primary }]}
        >
          Alterar Senha
        </Text>
        <TextInput
          label="Senha"
          value={store.user.password}
          onChangeText={(text) => { store.user.password = text }}
          style={styles.marginB10}
          error={store.errorPassword}
          secureTextEntry={!store.passwordVisible}
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
          label="Confirmar nova senha"
          value={store.user.confirmPassword}
          onChangeText={(text) => { store.user.confirmPassword = text }}
          style={store.errorConfirmPassword ? styles.marginB10 : styles.marginB20}
          error={store.errorConfirmPassword}
          secureTextEntry={!store.passwordVisible}
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
        <Button
          mode="contained"
          onPress={() => store.uptadeUserPassword()}
          style={styles.marginB10}
          disabled={store.disablePassword}
          loading={store.isFetching}
        >
          Confirmar
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
    </Container>
  )
})

const styles = StyleSheet.create({
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
  errorMessages: {
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 10,
  },
})

export default ChangePassword
