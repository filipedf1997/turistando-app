import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet, View,
} from 'react-native'
import {
  Text, useTheme,
} from 'react-native-paper'
import { Dropdown } from 'sharingan-rn-modal-dropdown'
import {
  Container, Content, Button, TextInput, HeaderBar, ModalFeedback, TextInputMask,
} from '../../components'
import { useStores } from '../../hooks/useStores'
import MyAccountStore from './store/MyAccountStore'

const EditFinancialData = observer(({ navigation }) => {
  const [store] = useState(() => new MyAccountStore())
  const { userStore } = useStores()
  const { colors } = useTheme()

  async function handleSubmit() {
    const result = await store.uptadeUserFinancialData()
    if (result) {
      userStore.user.financialData.bank = store.user.financialData.bank
      userStore.user.financialData.holderAccount = store.user.financialData.holderAccount
      userStore.user.financialData.accountType = store.user.financialData.accountType
      userStore.user.financialData.account = store.user.financialData.account
      userStore.user.financialData.agency = store.user.financialData.agency
      userStore.user.financialData.cpf = store.user.financialData.cpf
    }
  }

  useEffect(() => {
    store.user.financialData.bank = userStore.user.financialData.bank
    store.user.financialData.holderAccount = userStore.user.financialData.holderAccount
    store.user.financialData.accountType = userStore.user.financialData.accountType
    store.user.financialData.account = userStore.user.financialData.account
    store.user.financialData.agency = userStore.user.financialData.agency
    store.user.financialData.cpf = userStore.user.financialData.cpf
  }, [])

  return (
    <Container>
      <HeaderBar onPress={navigation.goBack} />
      <Content>
        <Text
          style={[styles.title, { color: colors.primary }]}
        >
          Alterar dados bancários
        </Text>
        <View style={styles.marginB10}>
          <Dropdown
            label={store.user.financialData.bank ? '' : 'Nome do banco'}
            mode="outlined"
            data={store.banks}
            value={store.user.financialData.bank}
            disableSort
            onChange={(value) => { store.user.financialData.bank = value }}
          />
        </View>
        <TextInput
          label="Nome do titular da conta"
          value={store.user.financialData.holderAccount}
          onChangeText={(text) => { store.user.financialData.holderAccount = text }}
          style={styles.marginB10}
        />
        <View style={styles.marginB10}>
          <Dropdown
            label={store.user.financialData.accountType ? '' : 'Tipo de conta'}
            mode="outlined"
            data={store.accountTypes}
            value={store.user.financialData.accountType}
            disableSort
            onChange={(value) => { store.user.financialData.accountType = value }}
          />
        </View>
        <TextInput
          label="Número da conta"
          value={store.user.financialData.account}
          onChangeText={(text) => { store.user.financialData.account = text }}
          style={styles.marginB10}
          keyboardType="numeric"
        />
        <TextInput
          label="Código da agência"
          value={store.user.financialData.agency}
          onChangeText={(text) => { store.user.financialData.agency = text }}
          style={styles.marginB10}
          keyboardType="numeric"
        />
        <TextInputMask
          type="cpf"
          label="CPF"
          maxLength={14}
          value={store.user.financialData.cpf}
          onChangeText={(text) => { store.user.financialData.cpf = text }}
          style={styles.marginB20}
        />
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
})

export default EditFinancialData
