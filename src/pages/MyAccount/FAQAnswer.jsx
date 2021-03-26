import React from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet,
} from 'react-native'
import {
  Text, useTheme,
} from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
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
        <Text style={[styles.question, { color: colors.lightText }]}>{store.selectedQuestion.question}</Text>
        {store.selectedQuestion.answer.map((text, index) => (
          <Text key={index} style={[styles.answer, { color: colors.lightText }]}>
            {`      ${text}`}
          </Text>
        ))}
      </Content>

    </Container>
  )
})

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 25,
    marginVertical: 20,
  },
  question: {
    fontFamily: 'Roboto-Bold',
    fontSize: RFValue(16),
    marginBottom: 15,
  },
  answer: {
    lineHeight: 19,
    marginBottom: 10,
  },
})

export default FAQAnswer
