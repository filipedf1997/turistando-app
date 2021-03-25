import React from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet, View, Dimensions,
} from 'react-native'
import {
  Text, useTheme,
} from 'react-native-paper'
import { Dropdown } from 'sharingan-rn-modal-dropdown'
import {
  Container, Content, Button, TextInput, HeaderBar, ModalFeedback, TextInputMask,
} from '../../components'
import Waves from '../../images/waves'

const originalWidth = 360
const originalHeight = 90
const aspectRatio = originalWidth / originalHeight
const windowWidth = Dimensions.get('screen').width

const FinancialData = observer(({ navigation, route }) => {
  const store = route?.params?.store
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
      <HeaderBar onPress={navigation.goBack} />
      <Content scrollViewProps={{ contentContainerStyle: styles.container }}>
        <Text
          style={[styles.title, { color: colors.primary }]}
        >
          Criar conta
        </Text>
        <Text
          style={[styles.subTitle, { color: colors.black }]}
        >
          Etapa 3 de 3 - Dados bancários
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
          style={styles.marginB10}
        />
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.marginB20}
          disabled={store.financialDataDisable}
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
  title: {
    fontSize: 25,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  marginB20: {
    marginBottom: 20,
  },
  marginB10: {
    marginBottom: 10,
  },
})

export default FinancialData
