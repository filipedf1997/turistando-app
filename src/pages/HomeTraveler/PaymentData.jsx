import React from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet, View,
} from 'react-native'
import {
  Text, useTheme, TextInput as TextInputPaper, Switch, Caption,
} from 'react-native-paper'
import {
  Container, Content, Button, TextInput, HeaderBar, ModalFeedback, TextInputMask,
} from '../../components'

const PaymentData = observer(({ navigation, route }) => {
  const store = route?.params?.store
  const { colors } = useTheme()

  async function handleSubmitPayment() {
    const result = store.buyExperience()
    if (result) {
      store.resetStore()
      store.requestFeedback = {
        visible: true,
        error: false,
        title: 'Reserva efetivada com sucesso!',
        message: 'Entre em contato com o prestador de serviço na aba de Agendamentos.',
        onPress: () => {
          store.requestFeedback.visible = false
          navigation.navigate('HomeTraveler')
        },
        btnName: 'Ok',
      }
    } else {
      store.requestFeedback = {
        visible: true,
        error: true,
        title: 'Não foi possível efetivar a reserva',
        message: 'A reserva não foi efetivado, mas não se preocupe, nenhum valor será cobrado. Tente novamente!',
        onPress: () => {
          store.requestFeedback.visible = false
        },
        btnName: 'Ok',
      }
    }
  }

  return (
    <Container>
      <HeaderBar onPress={navigation.goBack} />
      <Content>
        <Text
          style={[styles.title, { color: colors.primary }]}
        >
          Pagamento
        </Text>
        <TextInputMask
          type="credit-card"
          maxLength={19}
          label="Número do cartão"
          value={store.paymentData.cardNumber}
          onChangeText={(text) => { store.paymentData.cardNumber = text }}
          style={styles.marginB10}
          right={<TextInputPaper.Icon name="chevron-right" color={colors.primary} size={35} />}
        />
        <View style={styles.rowWrapper}>
          <TextInputMask
            type="datetime"
            maxLength={5}
            label="Vencimento"
            value={store.paymentData.cardDate}
            onChangeText={(text) => { store.paymentData.cardDate = text }}
            style={[styles.rowInput, styles.marginB10]}
          />
          <TextInput
            label="CVV"
            maxLength={3}
            keyboardType="numeric"
            value={store.paymentData.cardCVV}
            onChangeText={(text) => { store.paymentData.cardCVV = text }}
            style={[styles.rowInput, styles.marginB10]}
          />
        </View>
        <TextInput
          label="Nome como está no cartão"
          value={store.paymentData.cardHolder}
          onChangeText={(text) => { store.paymentData.cardHolder = text }}
          style={styles.marginB10}
          right={<TextInputPaper.Icon name="chevron-right" color={colors.primary} size={35} />}
        />
        <TextInputMask
          type="cpf"
          label="CPF do titular"
          maxLength={14}
          value={store.paymentData.cardHolderCpf}
          onChangeText={(text) => { store.paymentData.cardHolderCpf = text }}
          style={styles.marginB10}
          right={<TextInputPaper.Icon name="chevron-right" color={colors.primary} size={35} />}
        />
        <View
          style={[styles.checkWrapper, styles.marginB10]}
        >
          <Switch
            color={colors.primary}
            value={store.paymentData.isIndication}
            onValueChange={() => { store.paymentData.isIndication = !store.paymentData.isIndication }}
          />
          <Caption style={styles.switchLabel}>
            Alguém indicou nosso serviço?
          </Caption>
        </View>
        {store.paymentData.isIndication
          && (
          <TextInput
            label="Conte quem nos indicou..."
            value={store.paymentData.indication}
            onChangeText={(text) => { store.paymentData.indication = text }}
            style={styles.marginB20}
          />
          )}
        <Button
          mode="contained"
          onPress={handleSubmitPayment}
          style={styles.marginB10}
          disabled={store.disable}
          loading={store.isFetching}
        >
          Confirmar pagamento
        </Button>
      </Content>

      <ModalFeedback
        visible={store.requestFeedback.visible}
        title={store.requestFeedback.title}
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
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  rowInput: {
    width: '45%',
  },
  checkWrapper: {
    flexDirection: 'row',
  },
  switchLabel: {
    flex: 1,
    marginLeft: 10,
  },
})

export default PaymentData
