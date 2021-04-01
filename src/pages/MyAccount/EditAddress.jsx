import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet, View,
} from 'react-native'
import {
  Text, useTheme, Caption,
} from 'react-native-paper'
import {
  Container, Content, Button, TextInput, HeaderBar, ModalFeedback, TextInputMask,
} from '../../components'
import { useStores } from '../../hooks/useStores'
import MyAccountStore from './store/MyAccountStore'

const CEP_SIZE = 9

const EditAddress = observer(({ navigation }) => {
  const [store] = useState(() => new MyAccountStore())
  const { userStore } = useStores()
  const { colors } = useTheme()

  async function handleSubmit() {
    const result = await store.uptadeUserAddress()
    if (result) {
      userStore.user.address.cep = store.user.address.cep
      userStore.user.address.cepNumber = store.user.address.cepNumber
      userStore.user.address.street = store.user.address.street
      userStore.user.address.district = store.user.address.district
      userStore.user.address.number = store.user.address.number
      userStore.user.address.city = store.user.address.city
      userStore.user.address.uf = store.user.address.uf
    }
  }

  useEffect(() => {
    store.user.address.cep = userStore.user.address.cep
    store.user.address.cepNumber = userStore.user.address.cepNumber
    store.user.address.street = userStore.user.address.street
    store.user.address.district = userStore.user.address.district
    store.user.address.number = userStore.user.address.number
    store.user.address.city = userStore.user.address.city
    store.user.address.uf = userStore.user.address.uf
  }, [])

  useEffect(() => {
    if (!store.firstTime && store.user.address.cepNumber.length >= CEP_SIZE - 1) {
      store.getAddress()
    }
  }, [store.user.address.cepNumber])

  return (
    <Container>
      <HeaderBar onPress={navigation.goBack} />
      <Content>
        <Text
          style={[styles.title, { color: colors.primary }]}
        >
          Alterar endereço
        </Text>
        <TextInputMask
          type="zip-code"
          label="CEP"
          includeRawValueInChangeText
          value={store.user.address.cep}
          onChangeText={(text, number) => {
            store.user.address.cep = text
            store.user.address.cepNumber = number
            store.firstTime = false
          }}
          style={styles.marginB10}
          maxLength={CEP_SIZE}
          error={store.errorCep}
        />
        {store.errorCep
          && (
          <Caption style={[styles.errorMessages, { color: colors.error }]}>
            CEP incorreto!
          </Caption>
          )}
        <TextInput
          label="Rua/Av./Travessa"
          value={store.user.address.street}
          onChangeText={(text) => { store.user.address.street = text }}
          style={styles.marginB10}
        />
        <View style={styles.rowWrapper}>
          <TextInput
            label="Bairro"
            value={store.user.address.district}
            onChangeText={(text) => { store.user.address.district = text }}
            style={[styles.longInput, styles.marginB10]}
          />
          <TextInput
            label="Nº"
            value={store.user.address.number}
            onChangeText={(text) => { store.user.address.number = text }}
            style={[styles.shortInput, styles.marginB10]}
            keyboardType="numeric"
          />
        </View>
        <View style={[styles.marginB10, styles.rowWrapper]}>
          <TextInput
            label="Cidade"
            value={store.user.address.city}
            onChangeText={(text) => { store.user.address.city = text }}
            style={[styles.longInput, styles.marginB10]}
          />
          <TextInput
            label="UF"
            value={store.user.address.uf}
            onChangeText={(text) => { store.user.address.uf = text }}
            style={[styles.shortInput, styles.marginB10]}
          />
        </View>
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.marginB20}
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
  rowWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  longInput: {
    width: '65%',
  },
  shortInput: {
    width: '30%',
  },
  errorMessages: {
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 10,
  },
})

export default EditAddress
