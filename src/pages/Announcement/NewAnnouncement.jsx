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

const NewAnnouncement = observer(({ navigation, route }) => {
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

  async function handleSubmit() {
    const result = await store.createAnnouncement()
    if (result) {
      store.requestFeedback = {
        visible: true,
        error: false,
        message: 'Anúncio criado com sucesso!',
        onPress: () => {
          store.resetStore()
          navigation.goBack()
          store.getAnnouncements()
        },
        btnName: 'Ok',
      }
    } else {
      store.requestFeedback = {
        visible: true,
        error: true,
        message: 'Não foi possível cadastrar o anúncio. Tente novamente.',
        onPress: () => { store.requestFeedback.visible = false },
        btnName: 'Ok',
      }
    }
  }

  useEffect(() => {
    getPermission()
  }, [])

  return (
    <Container>
      <HeaderBar onPress={() => {
        store.resetStore()
        navigation.goBack()
      }}
      />
      <Content>
        <Text
          style={[styles.title, { color: colors.primary }]}
        >
          Adicionar um anúncio
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
          onPress={handleSubmit}
          style={styles.wrapper}
          disabled={store.disable}
          loading={store.isFetching}
        >
          Confirmar
        </Button>
      </Content>

      <ModalFeedback
        visible={store.requestFeedback.visible}
        message={store.requestFeedback.message}
        btnName={store.requestFeedback.btnName}
        error={store.requestFeedback.error}
        success={!store.requestFeedback.error}
        onPress={store.requestFeedback.onPress}
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
})

export default NewAnnouncement
