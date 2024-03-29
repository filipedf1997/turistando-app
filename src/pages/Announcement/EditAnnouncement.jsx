import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
} from 'react-native'
import {
  Text, useTheme,
} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import { MultiselectDropdown } from 'sharingan-rn-modal-dropdown'
import {
  Container, Content, HeaderBar, TextInput, TextInputMask, DaysButton, Button, ModalFeedback,
} from '../../components'
import EmptyImage from './UI/EmptyImage'

const EditAnnouncement = observer(({ navigation, route }) => {
  const store = route?.params?.store
  const { colors } = useTheme()

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    })

    if (!result.cancelled) {
      store.announcement.photo = Platform.OS === 'ios' ? result.uri.replace('file://', '') : result.uri
      const response = await fetch(result.uri)
      store.photoBlob = await response.blob()
    }
  }

  async function getPermission() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert(null, 'Precisamos de sua permissão para acessar as imagens do seu dispositivo.')
    }
  }

  async function handleSubmit(deleteAnnouncement) {
    let result
    if (deleteAnnouncement) result = await store.deleteAnnouncement()
    else result = await store.editAnnouncement()

    store.requestFeedback = {
      visibleEdit: true,
      error: !result.status,
      message: result.message,
      onPress: () => {
        store.requestFeedback.visibleEdit = false
        if (result.status) goBackActions()
      },
      btnName: 'Ok',
    }
  }

  function showWarningModal() {
    store.requestFeedback = {
      visibleEdit: true,
      error: false,
      message: 'Você deseja excluir este anúncio?',
      onPress: () => {
        store.requestFeedback.visibleEdit = false
        handleSubmit(true)
      },
      btnName: 'Sim',
      secundaryAction: () => { store.requestFeedback.visibleEdit = false },
      secundaryName: 'Voltar',
      withoutIcon: true,
    }
  }

  function goBackActions() {
    store.resetStore()
    navigation.goBack()
    store.getAnnouncements()
  }

  useEffect(() => {
    getPermission()
  }, [])

  return (
    <Container>
      <HeaderBar onPress={goBackActions} />
      <Content>
        <Text
          style={[styles.title, { color: colors.primary }]}
        >
          Editar anúncio
        </Text>

        <View style={styles.wrapper}>
          <Text style={styles.subTitle}>Título</Text>
          <TextInput
            label="Título do anúncio"
            value={store.announcement.title}
            onChangeText={(text) => { store.announcement.title = text }}
          />
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.subTitle}>Tipo de experiência</Text>
          <MultiselectDropdown
            label=""
            emptySelectionText="Selecione uma ou mais opçōes"
            mode="outlined"
            data={store.experiencesTypes}
            chipType="flat"
            chipTextStyle={{ color: colors.white }}
            chipStyle={{ backgroundColor: colors.blue, borderWidth: 0 }}
            value={store.announcement.experiencesTypes}
            onChange={(list) => { store.announcement.experiencesTypes = list }}
          />
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.subTitle}>Adicione uma foto</Text>
          <TouchableOpacity
            onPress={pickImage}
            style={styles.imageContainer}
          >
            {store.announcement.photo
              ? <Image source={{ uri: store.announcement.photo }} style={styles.image} />
              : <EmptyImage />}
          </TouchableOpacity>
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.subTitle}>Descrição</Text>
          <TextInput
            label="Digite aqui..."
            multiline
            numberOfLines={3}
            value={store.announcement.description}
            onChangeText={(text) => { store.announcement.description = text }}
          />
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.subTitle}>Valor da experiência</Text>
          <TextInputMask
            type="money"
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$ ',
              suffixUnit: '',
            }}
            label="Coloque aqui o valor"
            value={store.announcement.amountText}
            includeRawValueInChangeText
            onChangeText={(text, value) => {
              store.announcement.amountText = text
              store.announcement.amount = value
            }}
          />
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.subTitle}>Dias disponíveis</Text>
          <Text style={styles.text}>
            Selecione os dias da semana que seu trabalho fica disponível
          </Text>
          <View style={styles.daysContainer}>
            {store.days.map((value, index) => (
              <DaysButton
                key={index}
                value={value}
                isActive={store.announcement.dates.includes(value)}
                action={() => store.handleDayChange(value)}
              />
            ))}
          </View>
        </View>

        <Button
          mode="contained"
          onPress={() => handleSubmit(false)}
          style={styles.marginB10}
          disabled={store.disable}
          loading={store.isFetching}
        >
          Confirmar alteraçōes
        </Button>

        <Button
          mode="outlined"
          onPress={showWarningModal}
          style={[styles.wrapper, { borderColor: colors.primary, borderWidth: 1 }]}
          loading={store.isFetchingDelete}
        >
          Excluir anúncio
        </Button>
      </Content>

      <ModalFeedback
        visible={store.requestFeedback.visibleEdit}
        message={store.requestFeedback.message}
        btnName={store.requestFeedback.btnName}
        error={store.requestFeedback.error}
        success={!store.requestFeedback.error}
        onPress={store.requestFeedback.onPress}
        secundaryAction={store.requestFeedback.secundaryAction}
        secundaryName={store.requestFeedback.secundaryName}
        withoutIcon={store.requestFeedback.withoutIcon}
      />
    </Container>
  )
})

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    marginVertical: 20,
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  text: {
    opacity: 0.7,
    marginTop: -5,
  },
  daysContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 160,
    borderRadius: 5,
  },
  marginB10: { marginBottom: 10 },
})

export default EditAnnouncement
