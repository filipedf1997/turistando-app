import React, { useState } from 'react'
import { observer } from 'mobx-react'
import {
  Alert,
  StyleSheet,
  View,
} from 'react-native'
import {
  Text,
  TextInput,
  Button,
} from 'react-native-paper'
import MyAccountStore from './store/MyAccountStore'
import { useStores } from '../../hooks/useStores'

const MyAccount = observer(() => {
  const [store] = useState(() => new MyAccountStore())
  const { userStore } = useStores()

  async function handleSubmit() {
    const result = await store.uptadeUser(userStore.user)
    if (result) {
      Alert.alert(null, 'Alterações feitas com sucesso!')
    } else {
      Alert.alert(null, 'Houve um erro ao fazer as alterações. Tente novamente.')
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={[styles.title, styles.marginB20]}
        >
          Minha conta
        </Text>
        <TextInput
          label="Nome"
          value={store.user.name}
          onChangeText={(text) => { store.user.name = text }}
          style={styles.marginB5}
        />
        <TextInput
          label="Telefone"
          value={store.user.fone}
          onChangeText={(text) => { store.user.fone = text }}
          style={styles.marginB5}
        />
        {userStore.user.isProvider
          && (
          <TextInput
            label="Descreva aqui seu perfil"
            value={store.user.profile}
            onChangeText={(text) => { store.user.profile = text }}
            style={styles.marginB20}
            multiline
            numberOfLines={4}
          />
          )}
        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={store.disable}
          loading={store.isFetching}
        >
          Atualizar
        </Button>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: '#5602e6',
    textAlign: 'center',
  },
  marginB20: {
    marginBottom: 30,
  },
  marginB5: {
    marginBottom: 5,
  },
  checkWrapper: {
    flexDirection: 'row',
  },
  caption: {
    marginLeft: 10,
  },
})

export default MyAccount
