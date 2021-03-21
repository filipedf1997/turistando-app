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
import buyStatus from '../utils/buyStatus'

const ReservationsProviderCard = ({
  acceptAction, refuseAction, contactAction, item,
}) => {
  const { colors } = useTheme()
  const cutText = useCutText()

  return (
    <Surface style={styles.surface}>
      <StatusLabel status={item.status} />

      <View style={styles.container}>
        <Image
          defaultSource={require('../images/imageDefault.png')}
          source={{ uri: item.announcement.photo }}
          style={[styles.image, {
            width: item.status === buyStatus.PENDING ? s(120) : s(110),
            height: item.status === buyStatus.PENDING ? vs(130) : vs(120),
          }]}
        />

        <View style={styles.content}>
          <View style={styles.nameWrapper}>
            <CircleFirstLetter name={item.travelerName} />
            <Text style={[styles.name, styles.title]}>
              {cutText(item.travelerName, 17)}
            </Text>
          </View>

          <Text style={styles.text}>
            {cutText(item.announcement.title, 17)}
          </Text>

          <View style={styles.rowWrapper}>
            <Text style={styles.emphasis}>
              {moment.unix(item.reservationDate.seconds).format('DD/MM/YYYY')}
            </Text>
            <Text style={styles.emphasis}>
              {item.announcement.amountText}
            </Text>
          </View>

          {item.status === buyStatus.PENDING
            ? (
              <View>
                <Button
                  onPress={acceptAction}
                  contentStyle={{ height: vs(30), width: '100%' }}
                  labelStyle={{ fontSize: RFValue(12) }}
                  mode="contained"
                  style={{ marginBottom: 5 }}
                >
                  Aceitar
                </Button>
                <Button
                  onPress={refuseAction}
                  contentStyle={{ height: vs(30), width: '100%' }}
                  labelStyle={{ fontSize: RFValue(12) }}
                  mode="outlined"
                  style={{ borderColor: colors.primary, borderWidth: 1 }}
                >
                  Recusar
                </Button>
              </View>
            )
            : (
              <Button
                onPress={contactAction}
                contentStyle={{ height: vs(40), width: '100%' }}
                labelStyle={{ fontSize: RFValue(14) }}
                mode="outlined"
                style={{ borderColor: colors.primary, borderWidth: 1 }}
              >
                Contatar cliente
              </Button>
            )}
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
  },
  content: {
    justifyContent: 'space-between',
    marginLeft: 15,
    flex: 1,
  },
  title: {
    fontSize: RFValue(14),
    fontFamily: 'Roboto-Bold',
  },
  text: {
    fontSize: RFValue(15),
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

export default ReservationsProviderCard
