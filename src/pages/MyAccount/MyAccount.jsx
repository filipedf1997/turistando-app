import React from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet, View, Dimensions,
} from 'react-native'
import {
  Text, useTheme, TextInput as TextInputPaper,
} from 'react-native-paper'
import {
  Container, Content, Button, TextInput, HeaderBar, TextInputMask,
} from '../../components'
import { useStores } from '../../hooks/useStores'
import Waves from '../../images/waves'

const originalWidth = 360
const originalHeight = 80
const aspectRatio = originalWidth / originalHeight
const windowWidth = Dimensions.get('screen').width

const MyAccount = observer(({ navigation }) => {
  const { userStore } = useStores()
  const { colors } = useTheme()

  return (
    <Container>
      <HeaderBar onPress={() => navigation.navigate('Página inicial')} />
      <Content scrollViewProps={{ contentContainerStyle: styles.container }}>
        <Text
          style={[styles.title, { color: colors.primary }]}
        >
          Minha conta
        </Text>
        <TextInput
          disabled
          value={userStore.user.name}
          style={[styles.marginB10, styles.textInput]}
          left={<TextInputPaper.Icon name="account" color={colors.primary} size={25} />}
        />
        <TextInput
          disabled
          value={userStore.user.email}
          style={[styles.marginB10, styles.email]}
          keyboardType="email-address"
          left={<TextInputPaper.Icon name="email" color={colors.primary} size={25} />}
        />
        <TextInputMask
          type="cel-phone"
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) ',
          }}
          disabled
          value={userStore.user.fone}
          style={[styles.marginB10, styles.textInput]}
          left={<TextInputPaper.Icon name="phone-in-talk" color={colors.primary} size={25} />}
        />
        <TextInput
          disabled
          value="*********"
          style={[userStore.user.isProvider ? styles.marginB10 : styles.marginB20, styles.textInput]}
          secureTextEntry
          left={<TextInputPaper.Icon name="lock" color={colors.primary} size={25} />}
        />
        {userStore.user.isProvider
          && (
          <TextInput
            disabled
            label="Informações do Perfil:"
            value={userStore.user.profile}
            style={[styles.marginB20, styles.textInput]}
            multiline
            numberOfLines={3}
          />
          )}
        <Button
          mode="contained"
          onPress={() => navigation.navigate('EditData')}
          style={styles.marginB10}
        >
          Editar dados
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('FAQ')}
          style={styles.marginB10}
        >
          Perguntas Frequentes
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
  container: {
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
  },
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
  textInput: {
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  email: {
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
})

export default MyAccount
