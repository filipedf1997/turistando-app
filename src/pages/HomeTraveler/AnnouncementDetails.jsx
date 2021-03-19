import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { StyleSheet, View, Image } from 'react-native'
import { Text, useTheme, Snackbar } from 'react-native-paper'
import moment from 'moment'
import { vs } from 'react-native-size-matters'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize'
import {
  Container, Content, HeaderBarAnnoucementDetail, Button, CircleFirstLetter, DaysButton, Comments,
} from '../../components'
import FavoritesStore from '../Favorites/store/FavoritesStore'

const AnnouncementDetails = observer(({ navigation, route }) => {
  const store = route?.params?.store
  const [favoritesStore] = useState(() => new FavoritesStore())
  const { colors } = useTheme()

  function handleConfirmDate(date) {
    const day = moment(date).format('ddd')
    if (!store.announcement.dates.includes(day)) {
      store.snackbarVisibility = true
      store.reservationDateText = null
      store.reservationDate = null
      store.showDatePicker = false
      return
    }
    store.reservationDateText = date
    store.reservationDate = day
    store.showDatePicker = false
  }

  function renderRating(rating) {
    const total = rating.reduce((result, current) => result + current.stars, 0)
    return total / rating.length
  }

  async function checkFavorite() {
    store.isFavorite = await favoritesStore.checkFavorite(store.announcement)
  }

  useEffect(() => {
    checkFavorite()
  }, [])

  return (
    <Container>
      <Content scrollViewProps={{ contentContainerStyle: styles.container }}>
        <HeaderBarAnnoucementDetail
          arrowAction={() => {
            store.resetStore()
            navigation.goBack()
          }}
          favoriteAction={async () => {
            if (store.isFavorite) {
              store.isFavorite = !(await favoritesStore.removeFavorite(store.announcement))
            } else {
              store.isFavorite = await favoritesStore.addFavorite(store.announcement)
            }
          }}
          chatAction={() => navigation.navigate('Chat', { name: store.announcement.ownerName, isSupport: false })}
          isFavorite={store.isFavorite}
        />
        <Image defaultSource={require('../../images/imageDefault.png')} source={{ uri: store.announcement.photo }} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.titleWrapper}>
            <Text style={[styles.title, { color: colors.primary }]}>
              {store.announcement.title}
            </Text>
            <Text style={[styles.title, { color: colors.primary }]}>
              {store.announcement.amountText}
            </Text>
          </View>

          <View style={styles.rowWrapper}>
            <Text style={styles.text12}>
              Avaliaçōes:
            </Text>
            <Entypo name="star" size={15} color={colors.orange} style={styles.icon} />
            <Text style={[styles.rating, { color: colors.orange }]}>
              {`${store.announcement.rating.length ? renderRating(store.announcement.rating) : 0}`}
            </Text>
            <Text style={styles.text12}>
              {`(${store.announcement.rating.length ? store.announcement.rating.length : 0})`}
            </Text>
          </View>

          <Text style={styles.text}>
            {store.announcement.description}
          </Text>

          <View style={[styles.nameWrapper, styles.nameWrapperDescription]}>
            <CircleFirstLetter name={store.announcement.ownerName} />
            <Text style={[styles.name, styles.text12]}>
              {store.announcement.ownerName}
            </Text>
          </View>
          <Text style={styles.ownerDescription}>
            {store.announcement.ownerDescription}
          </Text>

          <Text style={styles.text12}>
            Disponível nos seguintes dias da semana:
          </Text>
          <View style={styles.daysContainer}>
            {store.days.map((value, index) => (
              <DaysButton
                key={index}
                value={value}
                isActive={store.announcement.dates.includes(value)}
                disabled
              />
            ))}
          </View>

          <Button
            mode="outlined"
            onPress={() => { store.showDatePicker = true }}
            style={[styles.dateBtn, { borderColor: colors.primary, borderWidth: store.reservationDateText ? 2 : 1 }]}
            icon={() => <MaterialCommunityIcons name="calendar-clock" size={24} color={colors.primary} />}
          >
            {store.reservationDateText ? `${moment(store.reservationDateText).format('ddd')}, ${moment(store.reservationDateText).format('DD/MM/YYYY')}` : 'Selecionar data'}
          </Button>
          <DateTimePickerModal
            pickerContainerStyleIOS={{ backgroundColor: colors.background }}
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
            customCancelButtonIOS={() => null}
            modalStyleIOS={styles.modalStyle}
            headerTextIOS="Selecione uma data"
            locale="pt_BR"
            isVisible={store.showDatePicker}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={() => { store.showDatePicker = false }}
            minimumDate={new Date()}
          />

          <View style={styles.rowWrapper}>
            <MaterialCommunityIcons name="comment-text-multiple" size={24} color={colors.black} />
            <Text style={styles.comments}>
              Comentários
            </Text>
          </View>
          {store.announcement.rating.length
            ? store.announcement.rating.map((item, index) => <Comments item={item} key={index} />)
            : (
              <View style={[styles.withoutComments, { backgroundColor: colors.whiteGray }]}>
                <Text style={styles.withoutCommentsText}>Este anúncio ainda não possui comentários :(</Text>
              </View>
            )}
        </View>
      </Content>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('AnnouncementConfirm', { store })}
        style={styles.btnReservation}
        disabled={!store.reservationDate}
      >
        Reservar
      </Button>

      <Snackbar
        visible={store.snackbarVisibility}
        onDismiss={() => { store.snackbarVisibility = false }}
        style={{ backgroundColor: colors.black }}
        duration={3000}
      >
        Data inválida! Tente novamente.
      </Snackbar>
    </Container>
  )
})

const styles = StyleSheet.create({
  container: { paddingHorizontal: 0 },
  content: { paddingHorizontal: 20 },
  image: {
    width: '100%',
    height: vs(280),
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  title: {
    fontSize: RFValue(20),
    fontFamily: 'Roboto-Bold',
  },
  text: {
    fontSize: RFValue(14),
  },
  ownerDescription: {
    fontSize: RFValue(12),
    marginBottom: 10,
  },
  nameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  nameWrapperDescription: { marginTop: 10 },
  text12: {
    fontSize: RFValue(12),
    opacity: 0.8,
  },
  name: { marginLeft: 5 },
  dateBtn: {
    marginTop: 15,
    marginBottom: 10,
  },
  modalStyle: {
    justifyContent: 'center',
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  rating: {
    fontSize: RFValue(12),
    marginRight: 3,
  },
  icon: {
    marginLeft: 5,
    marginRight: 2,
  },
  daysContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7,
  },
  btnReservation: { margin: 20 },
  comments: {
    marginLeft: 7,
    fontSize: RFValue(15),
  },
  withoutComments: {
    marginTop: 10,
    borderRadius: 4,
    padding: 15,
  },
  withoutCommentsText: {
    textAlign: 'center',
    fontSize: RFValue(13),
    opacity: 0.9,
  },
})

export default AnnouncementDetails
