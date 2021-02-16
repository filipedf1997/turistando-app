import React, { useState } from 'react'
import { StyleSheet, Alert } from 'react-native'
import {
  Text,
  useTheme,
  TextInput as TextInputPaper,
} from 'react-native-paper'
import {
  Container,
  Content,
  Button,
  TextInput,
  HeaderBar,
} from '../../components'
import firebase from '../../firebase/firebaseConfig'
import Waves from '../../images/waves'

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { colors } = useTheme()

  async function handleSubmit() {
    try {
      setLoading(true)
      await firebase.auth().sendPasswordResetEmail(email)
      setLoading(false)
      Alert.alert(null, 'O email foi enviado com sucesso!')
    } catch (error) {
      setLoading(false)
      Alert.alert(null, 'Houve um erro ao enviar o email. Tente novamente.')
    }
  }

  return (
    <Container>
      <HeaderBar onPress={() => navigation.navigate('SignIn')} />
      <Content scrollViewProps={{ contentContainerStyle: styles.container }}>
        <Text
          style={[styles.title, { color: colors.primary }]}
        >
          Esqueci minha senha
        </Text>
        <Text style={[styles.text, { color: colors.lightText }]}>
          Informe seu e-mail para receber uma mensagem com as instruções para mudança de senha.
        </Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.marginV15}
          left={<TextInputPaper.Icon name="email" color={colors.primary} size={25} />}
        />
        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={!email}
          loading={loading}
        >
          Enviar
        </Button>
      </Content>
      <Waves />
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    marginBottom: 15,
  },
  text: {
    fontSize: 13,
  },
  marginV15: {
    marginVertical: 15,
  },
})

export default ForgotPassword
