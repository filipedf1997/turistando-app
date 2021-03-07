import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native'
import {
  Text, useTheme,
} from 'react-native-paper'
import { MultiselectDropdown } from 'sharingan-rn-modal-dropdown'
import * as ImagePicker from 'expo-image-picker'
import {
  Container, Content, HeaderBar, TextInput, TextInputMask, DaysButton, Button,
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
      quality: 1,
    })

    if (!result.cancelled) {
      store.announcement.photo = result.uri
    }
  }

  async function getPermission() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert(null, 'Sorry, we need camera roll permissions to make this work!')
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
      <Content scrollViewProps={{ contentContainerStyle: styles.container }}>
        <Text
          style={[styles.title, { color: colors.primary }]}
        >
          Adicionar um anúncio
        </Text>

        <View style={styles.wrapper}>
          <Text style={styles.subTitle}>Título</Text>
          <TextInput
            label="Título do anúncio"
            value={store.announcement.tile}
            onChangeText={(text) => { store.announcement.tile = text }}
          />
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.subTitle}>Tipo de experiência</Text>
          <MultiselectDropdown
            emptySelectionText="Selecione uma ou mais opçōes"
            data={store.experiencesTypes}
            chipType="flat"
            chipTextStyle={{ color: colors.white }}
            chipStyle={{ backgroundColor: colors.blue }}
            value={store.announcement.experiencesTypes}
            mode="outlined"
            onChange={(value) => { store.announcement.experiencesTypes = value }}
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
              unit: 'R$ ',
            }}
            label="Coloque aqui o valor"
            value={store.announcement.amount}
            onChangeText={(t) => { store.announcement.amount = t }}
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
                key={value}
                value={value}
                isActive={store.announcement.dates.includes(index)}
                action={() => store.handleDayChange(index)}
              />
            ))}
          </View>
        </View>

        <Button
          mode="contained"
          onPress={() => null}
          style={styles.wrapper}
        >
          Confirmar
        </Button>
      </Content>
    </Container>
  )
})

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
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
