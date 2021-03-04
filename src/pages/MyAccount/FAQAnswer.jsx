import React from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet,
} from 'react-native'
import {
  Text, useTheme,
} from 'react-native-paper'
import {
  Container, Content, HeaderBar,
} from '../../components'

const FAQAnswer = observer(({ navigation, route }) => {
  const store = route?.params?.store
  const { colors } = useTheme()

  return (
    <Container>
      <HeaderBar onPress={navigation.goBack} />
      <Content scrollViewProps={{ contentContainerStyle: styles.container }}>
        <Text
          style={[styles.title, { color: colors.primary }]}
        >
          Perguntas Frequentes
        </Text>
        <Text style={styles.question}>{store.selectedQuestion.question}</Text>
        <Text style={styles.answer}>{`\t${store.selectedQuestion.answer}`}</Text>
      </Content>

    </Container>
  )
})

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  title: {
    fontSize: 25,
    marginVertical: 20,
  },
  question: {
    fontWeight: 'bold',
    marginBottom: 15,
  },
  answer: {
    lineHeight: 19,
  },
})

export default FAQAnswer
