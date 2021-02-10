import React, { useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import {
  Text,
  TextInput,
  Button
} from 'react-native-paper'
import firebase from '../../firebase/firebaseConfig'

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

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
    <View style={styles.container}>
      <View>
        <Text style={[styles.title, styles.marginB5]}>
          Esqueci a senha
        </Text>
        <Text style={styles.marginB5}>
          Informe seu e-mail para receber uma mensagem com as instruções para redefinir a sua senha.
        </Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.marginB20}
        />
        <Button
          mode="contained"
          style={styles.marginB5}
          onPress={handleSubmit}
          disabled={!email}
          loading={loading}
        >
          Enviar
        </Button>
        <Button
          onPress={() => navigation.navigate('SignIn')}
        >
          Voltar
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    color: '#5602e6',
    textAlign: 'center'
  },
  marginB20: {
    marginBottom: 30
  },
  marginB5: {
    marginBottom: 5
  }
})

export default ForgotPassword
