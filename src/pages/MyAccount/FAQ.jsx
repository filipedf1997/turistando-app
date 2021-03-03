import React from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet, View,
} from 'react-native'
import {
  Text, useTheme,
} from 'react-native-paper'
import {
  Container, Content, HeaderBar, FaqButton,
} from '../../components'

const FAQ = observer(({ navigation }) => {
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
        <FaqButton
          text="O que é o Turistando Beberibe?"
        />
        <FaqButton
          text="O que é o Turistando Beberibe?"
        />
      </Content>

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
})

export default FAQ
