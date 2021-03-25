import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet, View, Dimensions,
} from 'react-native'
import {
  Text, useTheme, Caption,
} from 'react-native-paper'
import {
  Container, Content, Button, TextInput, HeaderBar, TextInputMask,
} from '../../components'
import Waves from '../../images/waves'

const originalWidth = 360
const originalHeight = 90
const aspectRatio = originalWidth / originalHeight
const windowWidth = Dimensions.get('screen').width
const CEP_SIZE = 9

const Address = observer(({ navigation, route }) => {
  const store = route?.params?.store
  const { colors } = useTheme()

  useEffect(() => {
    if (store.user.address.cepNumber.length >= CEP_SIZE - 1) {
      store.getAddress()
    }
  }, [store.user.address.cepNumber])

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
          Etapa 2 de 3 - Endereço
        </Text>
        <TextInputMask
          type="zip-code"
          label="CEP"
          includeRawValueInChangeText
          value={store.user.address.cep}
          onChangeText={(text, number) => {
            store.user.address.cep = text
            store.user.address.cepNumber = number
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
          onPress={() => navigation.navigate('FinancialData', { store })}
          style={styles.marginB20}
          disabled={store.adressDisable}
        >
          Prosseguir
        </Button>
      </Content>

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

export default Address
