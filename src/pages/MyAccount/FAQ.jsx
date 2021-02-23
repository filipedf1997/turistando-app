import React from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet, View, Dimensions,
} from 'react-native'
import {
  Text, useTheme,
} from 'react-native-paper'
import {
  Container, Content, HeaderBar,
} from '../../components'
import Waves from '../../images/waves'

const originalWidth = 360
const originalHeight = 110
const aspectRatio = originalWidth / originalHeight
const windowWidth = Dimensions.get('screen').width

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
  container: {
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 25,
    marginVertical: 20,
  },
})

export default FAQ
