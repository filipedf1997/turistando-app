import React from 'react'
import { observer } from 'mobx-react'
import { StyleSheet, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { AirbnbRating } from 'react-native-ratings'
import {
  Container, Content, HeaderBar, Button, TextInput, TuristandoRating, ModalFeedback,
} from '../../components'

const EvaluationScreen = observer(({ navigation, route }) => {
  const store = route?.params?.store
  const { colors } = useTheme()

  async function handleSubmit() {
    const result = await store.doRating()
    if (result) {
      store.requestFeedback = {
        visible: true,
        error: false,
        message: 'Avaliação enviada com sucesso!',
        onPress: () => {
          store.requestFeedback.visible = false
          navigation.goBack()
        },
        btnName: 'Ok',
      }
    } else {
      store.requestFeedback = {
        visible: true,
        error: true,
        message: 'Não foi possível enviar a avalição. Tente novamente.',
        onPress: () => { store.requestFeedback.visible = false },
        btnName: 'Ok',
      }
    }
  }

  return (
    <Container>
      <HeaderBar onPress={() => {
        store.resetStore()
        navigation.goBack()
      }}
      />
      <Content>
        <Text style={[styles.title, { color: colors.primary }]}>
          Avaliação
        </Text>
        <View style={styles.line} />

        <Text style={[styles.subTitle, { color: colors.primary }]}>
          O que você achou da experiência?
        </Text>
        <Text style={styles.text}>
          Escolha de 1 a 5 estrelas para classificar.
        </Text>
        <AirbnbRating
          defaultRating={0}
          showRating={false}
          selectedColor={colors.orange}
          size={40}
          starContainerStyle={styles.stars}
          onFinishRating={(rating) => { store.rating.stars = rating }}
        />
        <View style={styles.line} />

        <Text style={[styles.subTitle, { color: colors.primary }]}>
          Você gostou do serviço?
        </Text>
        <Text style={styles.text}>
          Conte-nos com um comentário se gostou ou não.
        </Text>
        <TextInput
          label="Escreva seu comentário"
          value={store.rating.comment}
          onChangeText={(text) => { store.rating.comment = text }}
          multiline
          numberOfLines={3}
        />
        <View style={styles.line} />

        <Text style={[styles.subTitle, { color: colors.primary }]}>
          Avalie também o Turistando Beberibe.
        </Text>
        <Text style={styles.text}>
          Escolha em uma escala de 0 a 10, quanto você está
          curtindo o aplicativo?
        </Text>
        <View style={styles.turistandoRatingWrapper}>
          {store.turistandoGrades.map((value) => (
            <TuristandoRating
              key={value}
              value={value}
              isActive={store.rating.turistando === value}
              action={() => { store.rating.turistando = value }}
            />
          ))}
        </View>
        <View style={styles.line} />

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
          disabled={!store.rating.stars}
          loading={store.isFetching}
        >
          Avaliar
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
    marginTop: 20,
    marginBottom: -10,
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  text: {
    opacity: 0.8,
  },
  line: {
    borderTopWidth: 1,
    opacity: 0.6,
    marginTop: 20,
    marginBottom: 10,
  },
  stars: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: -5,
  },
  turistandoRatingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
  },
})

export default EvaluationScreen
