import React from 'react'
import { observer } from 'mobx-react'
import { StyleSheet, View, Image } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import moment from 'moment'
import { vs } from 'react-native-size-matters'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize'
import {
  Container, Content, HeaderBarAnnoucementDetail, Button, CircleFirstLetter,
} from '../../components'

const AnnouncementConfirm = observer(({ navigation, route }) => {
  const store = route?.params?.store
  const { colors } = useTheme()

  function renderRating(rating) {
    const total = rating.reduce((result, current) => result + current.stars, 0)
    return total / rating.length
  }

  return (
    <Container>
      <Content scrollViewProps={{ contentContainerStyle: styles.container }}>
        <HeaderBarAnnoucementDetail
          arrowAction={navigation.goBack}
          onlyArrow
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

          <Button
            mode="outlined"
            style={[styles.dateBtn, { borderColor: colors.primary, borderWidth: store.reservationDateText ? 2 : 1 }]}
            icon={() => <MaterialCommunityIcons name="calendar-clock" size={24} color={colors.primary} />}
          >
            {store.reservationDateText ? `${moment(store.reservationDateText).format('ddd')}, ${moment(store.reservationDateText).format('DD/MM/YYYY')}` : 'Selecionar data'}
          </Button>

          <Text style={[styles.important, { color: colors.orange }]}>Importante!</Text>
          <Text style={styles.text}>
            Antes de efetivar a reserva, recomendamos entrar em contato com o prestador de serviços para acertamento de detalhes (horário pretendido, quantidade de pessoas, etc).
            A reserva só será confirmada quando o pagamento for efetivado.
          </Text>
        </View>
      </Content>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('PaymentData', { store })}
        style={styles.btnReservation}
      >
        Prosseguir com a reserva
      </Button>
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
    marginTop: 5,
    marginBottom: 10,
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
  btnReservation: { margin: 20 },
  important: {
    fontSize: RFValue(15),
    fontFamily: 'Roboto-Bold',
    marginBottom: 5,
  },
})

export default AnnouncementConfirm
