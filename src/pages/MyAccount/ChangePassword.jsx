import React from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet, View, Dimensions,
} from 'react-native'
import {
  Text, useTheme, TextInput as TextInputPaper, Caption,
} from 'react-native-paper'
import {
  Container, Content, Button, TextInput, HeaderBar, ModalFeedback,
} from '../../components'
import Waves from '../../images/waves'

const originalWidth = 360
const originalHeight = 110
const aspectRatio = originalWidth / originalHeight
const windowWidth = Dimensions.get('screen').width

const ChangePassword = observer(({ navigation, route }) => {
  const store = route?.params?.store
  const { colors } = useTheme()

  return (
    <Container>
      <HeaderBar onPress={navigation.goBack} />
      <Content scrollViewProps={{ contentContainerStyle: styles.container }}>
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
          secureTextEntry
          left={<TextInputPaper.Icon name="lock" color={store.errorPassword ? colors.red : colors.primary} size={25} />}
          right={<TextInputPaper.Icon name="chevron-right" color={colors.primary} size={35} />}
        />
        {store.errorPassword
          && (
          <Caption style={[styles.errorMessages, { color: colors.red }]}>
            A senha precisa conter no mínino 6 dígitos!
          </Caption>
          )}
        <TextInput
          label="Confirmar nova senha"
          value={store.user.confirmPassword}
          onChangeText={(text) => { store.user.confirmPassword = text }}
          style={store.errorConfirmPassword ? styles.marginB10 : styles.marginB20}
          secureTextEntry
          left={<TextInputPaper.Icon name="lock" color={store.errorConfirmPassword ? colors.red : colors.primary} size={25} />}
          right={<TextInputPaper.Icon name="chevron-right" color={colors.primary} size={35} />}
        />
        {store.errorConfirmPassword
          && (
          <Caption style={[styles.errorMessages, { color: colors.red }]}>
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
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
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
  errorMessages: {
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 10,
  },
})

export default ChangePassword
