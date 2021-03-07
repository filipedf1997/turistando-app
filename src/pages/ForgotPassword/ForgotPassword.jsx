import React, { useState, useEffect } from 'react'
import {
  View, StyleSheet, Dimensions,
} from 'react-native'
import {
  Text, useTheme, TextInput as TextInputPaper, Caption,
} from 'react-native-paper'
import {
  Container, Content, Button, TextInput, HeaderBar, ModalFeedback,
} from '../../components'
import firebase from '../../firebase/firebaseConfig'
import Waves from '../../images/waves'

const originalWidth = 360
const originalHeight = 90
const aspectRatio = originalWidth / originalHeight
const windowWidth = Dimensions.get('screen').width

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState(false)
  const [modalData, setModalData] = useState({})
  const [loading, setLoading] = useState(false)
  const { colors } = useTheme()

  async function handleSubmit() {
    try {
      setLoading(true)
      await firebase.auth().sendPasswordResetEmail(email)
      setLoading(false)
      setModalData({
        visible: true,
        error: false,
        success: true,
        message: 'A mensagem foi enviada para o seu e-mail com sucesso!',
        onPress: () => {
          setModalData({})
          navigation.navigate('SignIn')
        },
        btnName: 'Ir para Login',
      })
    } catch (error) {
      setLoading(false)
      setModalData({
        visible: true,
        error: true,
        success: false,
        message: 'Houve um erro ao enviar o e-mail. Tente novamente.',
        onPress: () => setModalData({}),
        btnName: 'Ok',
      })
    }
  }

  useEffect(() => {
    if (email !== '' && (!email.includes('@') || !email.includes('.'))) setErrorEmail(true)
    else setErrorEmail(false)
  }, [email])

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
          left={<TextInputPaper.Icon name="email" color={errorEmail ? colors.error : colors.primary} size={25} />}
        />
        {errorEmail
          && (
          <Caption style={[styles.errorMessages, { color: colors.error }]}>
            Digite um e-mail inválido!
          </Caption>
          )}
        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={!email || errorEmail}
          loading={loading}
        >
          Enviar
        </Button>
      </Content>

      <ModalFeedback
        visible={modalData?.visible}
        message={modalData?.message}
        btnName={modalData?.btnName}
        error={modalData?.error}
        success={modalData?.success}
        onPress={modalData?.onPress}
      />

      <View style={{ width: windowWidth, aspectRatio }}>
        <Waves
          width="100%"
          height="100%"
          viewBox={`0 0 ${originalWidth} ${originalHeight}`}
        />
      </View>
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
  errorMessages: {
    marginTop: -15,
    marginBottom: 15,
    marginLeft: 10,
  },
})

export default ForgotPassword
