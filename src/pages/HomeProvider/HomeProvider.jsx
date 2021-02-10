import { observer } from 'mobx-react'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import {
  Text,
  Button
} from 'react-native-paper'
import { useStores } from '../../hooks/useStores'
import firebase from '../../firebase/firebaseConfig'

const HomeProvider = observer(() => {
  const { userStore } = useStores()

  async function handleSubmit() {
    await firebase.auth().signOut()
    userStore.user = null
    userStore.idToken = null
  }

  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
      >
        {`Olá, Prestador ${userStore.user.name}`}
      </Text>
      <Button
        mode="contained"
        color="#FFF"
        onPress={handleSubmit}
      >
        Sair
      </Button>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5602e6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10
  },
})

export default HomeProvider
