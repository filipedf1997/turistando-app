import React from 'react'
import {
  Image, StyleSheet, View, Text,
} from 'react-native'
import {
  useTheme, Surface,
} from 'react-native-paper'
import { s, vs } from 'react-native-size-matters'
import { Entypo } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import Button from './Button'
import useCutText from '../hooks/useCutText'
import CircleFirstLetter from './CircleFirstLetter'

const AnnouncementCardTraveler = ({ action, item }) => {
  const { colors } = useTheme()
  const cutText = useCutText()

  function renderRating(rating) {
    const total = rating.reduce((result, current) => result + current.stars, 0)
    return total / rating.length
  }

  return (
    <Surface style={styles.container}>
      <Image defaultSource={require('../images/imageDefault.png')} source={{ uri: item.photo }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>
          {cutText(item.title, 20)}
        </Text>

        <View style={styles.rowWrapper}>
          <Text style={styles.text}>
            Avaliaçōes:
          </Text>
          <Entypo name="star" size={12} color={colors.orange} style={styles.icon} />
          <Text style={[styles.rating, { color: colors.orange }]}>
            {`${item.rating.length ? renderRating(item.rating) : 0}`}
          </Text>
          <Text style={styles.text}>
            {`(${item.rating.length ? item.rating.length : 0})`}
          </Text>
        </View>

        <View style={styles.rowWrapper}>
          <CircleFirstLetter name={item.ownerName} />
          <Text style={[styles.name, styles.text]}>
            {cutText(item.ownerName, 20)}
          </Text>
        </View>

        <Text style={styles.description}>
          {cutText(item.description, 40)}
        </Text>
        <Text style={[styles.value, { color: colors.orange }]}>
          {item.amountText}
        </Text>
        <Button
          onPress={action}
          contentStyle={{ height: vs(30), width: '100%' }}
          labelStyle={{ fontSize: RFValue(12) }}
          mode="contained"
        >
          Ver detalhes
        </Button>
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
    marginBottom: 20,
  },
  image: {
    width: s(120),
    height: vs(135),
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
  description: {
    fontSize: RFValue(12),
  },
  text: {
    fontSize: RFValue(11),
    opacity: 0.8,
  },
  name: {
    marginLeft: 5,
  },
  value: {
    marginBottom: 2,
    fontSize: RFValue(14),
    fontFamily: 'Roboto-Bold',
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  rating: {
    fontSize: RFValue(11),
    marginRight: 3,
  },
  icon: {
    marginLeft: 5,
    marginRight: 2,
  },
})

export default AnnouncementCardTraveler
