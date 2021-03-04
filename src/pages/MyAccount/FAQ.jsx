import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet,
} from 'react-native'
import {
  Text, useTheme, ActivityIndicator,
} from 'react-native-paper'
import {
  Container, Content, HeaderBar, FaqButton,
} from '../../components'
import MyAccountStore from './store/MyAccountStore'

const FAQ = observer(({ navigation }) => {
  const [store] = useState(() => new MyAccountStore())
  const { colors } = useTheme()

  useEffect(() => {
    store.getFaq()
  }, [])

  return (
    <Container>
      <HeaderBar onPress={navigation.goBack} />
      <Content scrollViewProps={{ contentContainerStyle: styles.container }}>
        <Text
          style={[styles.title, { color: colors.primary }]}
        >
          Perguntas Frequentes
        </Text>
        {store.isFetching
          ? <ActivityIndicator style={styles.activityIndicator} />
          : store.faq.map((item, index) => (
            <FaqButton
              key={index}
              text={item.question}
              action={() => {
                store.selectedQuestion = item
                navigation.navigate('FAQAnswer', { store })
              }}
            />
          ))}
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
  activityIndicator: { marginTop: 120 },
})

export default FAQ
