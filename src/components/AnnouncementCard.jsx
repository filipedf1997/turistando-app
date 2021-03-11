import React from 'react'
import {
  Image, StyleSheet, View, Text,
} from 'react-native'
import {
  useTheme, Surface,
} from 'react-native-paper'
import { s, vs } from 'react-native-size-matters'
import { RFValue } from 'react-native-responsive-fontsize'
import Button from './Button'
import DaysLabel from './DaysLabel'
import useCutText from '../hooks/useCutText'

const AnnouncementCard = ({ action, item }) => {
  const { colors } = useTheme()
  const cutText = useCutText()

  return (
    <Surface style={styles.container}>
      <Image defaultSource={require('../images/imageDefault.png')} source={{ uri: item.photo }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>
          {cutText(item.title, 20)}
        </Text>
        <Text style={styles.description}>
          {cutText(item.description, 40)}
        </Text>
        <Text style={styles.daysTitle}>
          Dias da semana:
        </Text>
        <DaysLabel dates={item.dates} />

        <View style={styles.bottom}>
          <View>
            <Text style={[styles.value, { color: colors.orange }]}>
              {item.amountText}
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              onPress={action}
              contentStyle={{ height: vs(30), width: '100%' }}
              labelStyle={{ fontSize: RFValue(12) }}
              mode="contained"
            >
              Editar
            </Button>
          </View>
        </View>
      </View>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    elevation: 6,
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: s(110),
    height: vs(120),
    borderRadius: 2,
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
  description: {
    fontSize: RFValue(12),
  },
  daysTitle: {
    fontSize: RFValue(14),
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    marginRight: 10,
    fontSize: RFValue(14),
    fontFamily: 'Roboto-Bold',
  },
  buttonWrapper: { flex: 1 },

})

export default AnnouncementCard
