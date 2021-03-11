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
import useCutText from '../hooks/useCutText'
import CircleFirstLetter from './CircleFirstLetter'

const AnnouncementCardTraveler = ({ action, item }) => {
  const { colors } = useTheme()
  const cutText = useCutText()

  return (
    <Surface style={styles.container}>
      <Image defaultSource={require('../images/imageDefault.png')} source={{ uri: item.photo }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>
          {cutText(item.title, 20)}
        </Text>

        <View style={styles.nameWrapper}>
          <CircleFirstLetter name={item.ownerName} />
          <Text style={styles.name}>
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
  name: {
    fontSize: RFValue(11),
    marginLeft: 5,
    opacity: 0.6,
  },
  value: {
    marginRight: 10,
    fontSize: RFValue(14),
    fontFamily: 'Roboto-Bold',
  },
  nameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default AnnouncementCardTraveler
