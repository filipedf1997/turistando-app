import React from 'react'
import {
  Image, StyleSheet, View,
} from 'react-native'
import {
  useTheme, Surface, Text,
} from 'react-native-paper'
import { s, vs } from 'react-native-size-matters'
import { RFValue } from 'react-native-responsive-fontsize'
import moment from 'moment'
import Button from './Button'
import useCutText from '../hooks/useCutText'
import CircleFirstLetter from './CircleFirstLetter'
import StatusLabel from './StatusLabel'

const ReservationsTravelerCard = ({
  seeDetails, seeDetailsRefused, contact, rate, item,
}) => {
  const { colors } = useTheme()
  const cutText = useCutText()

  function actionType(type) {
    const actionData = {
      PENDING: { action: seeDetails, text: 'Ver detalhes' },
      CONFIRMED: { action: contact, text: 'Entrar em contato' },
      REFUSED: { action: seeDetailsRefused, text: 'Ver detalhes' },
      CONCLUDED: { action: rate, text: 'Avaliar' },
    }
    return actionData[type] ?? actionData.PENDING
  }

  return (
    <Surface style={styles.surface}>
      <StatusLabel status={item.status} />

      <View style={styles.container}>
        <Image
          defaultSource={require('../images/imageDefault.png')}
          source={{ uri: item.announcement.photo }}
          style={[styles.image, {

          }]}
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            {cutText(item.announcement.title, 20)}
          </Text>

          <View style={styles.nameWrapper}>
            <CircleFirstLetter name={item.announcement.ownerName} />
            <Text style={[styles.name, styles.text]}>
              {cutText(item.announcement.ownerName, 20)}
            </Text>
          </View>

          <View style={styles.rowWrapper}>
            <Text style={styles.emphasis}>
              {moment.unix(item.reservationDate.seconds).format('DD/MM/YYYY')}
            </Text>
            <Text style={styles.emphasis}>
              {item.announcement.amountText}
            </Text>
          </View>

          <Button
            onPress={actionType(item.status).action}
            contentStyle={{ height: vs(40), width: '100%' }}
            labelStyle={{ fontSize: RFValue(12), fontFamily: 'Roboto-Bold' }}
            mode="outlined"
            style={{ borderColor: colors.primary, borderWidth: 1 }}
          >
            {actionType(item.status).text}
          </Button>
        </View>
      </View>
    </Surface>
  )
}

const styles = StyleSheet.create({
  surface: {
    padding: 15,
    marginBottom: 20,
    elevation: 4,
    borderRadius: 3,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  image: {
    borderRadius: 2,
    alignSelf: 'center',
    width: s(110),
    height: vs(120),
  },
  content: {
    justifyContent: 'space-between',
    marginLeft: 15,
    flex: 1,
  },
  title: {
    fontSize: RFValue(16),
    fontFamily: 'Roboto-Bold',
  },
  text: {
    fontSize: RFValue(14),
  },
  emphasis: {
    fontSize: RFValue(13),
    fontFamily: 'Roboto-Bold',
    marginBottom: 3,
  },
  name: {
    marginLeft: 5,
  },
  nameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

export default ReservationsTravelerCard
