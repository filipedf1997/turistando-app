import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet, View, Dimensions,
} from 'react-native'
import {
  Text, useTheme, TextInput as TextInputPaper,
} from 'react-native-paper'
import {
  Container, Content, Button, TextInput, HeaderBar, ModalFeedback, TextInputMask,
} from '../../components'
import { useStores } from '../../hooks/useStores'
import MyAccountStore from './store/MyAccountStore'
import Waves from '../../images/waves'

const originalWidth = 360
const originalHeight = 110
const aspectRatio = originalWidth / originalHeight
const windowWidth = Dimensions.get('screen').width

const EditData = observer(({ navigation }) => {
  const [store] = useState(() => new MyAccountStore())
  const { userStore } = useStores()
  const { colors } = useTheme()

  async function handleSubmit() {
    const result = await store.uptadeUserData()
    if (result) {
      userStore.user.name = store.user.name
      userStore.user.fone = store.user.fone
      userStore.user.profile = store.user.profile
    }
  }

  useEffect(() => {
    store.user.name = userStore.user.name
    store.user.email = userStore.user.email
    store.user.fone = userStore.user.fone
    store.user.profile = userStore.user.profile
    store.user.isProvider = userStore.user.isProvider
  }, [])

  return (
    <Container>
      <HeaderBar onPress={navigation.goBack} />
      <Content scrollViewProps={{ contentContainerStyle: styles.container }}>
        <Text
          style={[styles.title, { color: colors.primary }]}
        >
          Editar Dados
        </Text>
        <TextInput
          value={store.user.name}
          onChangeText={(text) => { store.user.name = text }}
          style={[styles.marginB10, {
            height: 60, backgroundColor: '#E5E5E5', borderColor: '#B5B4B4', borderWidth: 2,
          }]}
          left={<TextInputPaper.Icon name="account" color={colors.primary} size={25} />}
          right={<TextInputPaper.Icon name="chevron-right" color={colors.primary} size={35} />}
        />
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
          right={<TextInputPaper.Icon name="chevron-right" color={colors.primary} size={35} />}
        />
        <TextInput
          disabled
          value="*********"
          style={[store.user.isProvider ? styles.marginB10 : styles.marginB20, styles.textInput]}
          secureTextEntry
          left={<TextInputPaper.Icon name="lock" color={store.errorPassword ? colors.red : colors.primary} size={25} />}
        />
        {store.user.isProvider
          && (
          <TextInput
            label="Informações do Perfil:"
            value={store.user.profile}
            onChangeText={(text) => { store.user.profile = text }}
            style={styles.marginB20}
            multiline
            numberOfLines={3}
            right={<TextInputPaper.Icon name="chevron-right" color={colors.primary} size={35} />}
          />
          )}
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.marginB10}
          disabled={store.disableEdit}
          loading={store.isFetching}
        >
          Confirmar
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('ChangePassword', { store })}
          style={styles.marginB10}
        >
          Editar senha
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
  textInput: {
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
})

export default EditData
