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

const AnnouncementCard = ({ action, item, secundaryAction }) => {
  const { colors } = useTheme()
  const cutText = useCutText()

  return (
    <Surface style={styles.container}>
      <Image defaultSource={require('../images/imageDefault.png')} source={{ uri: item.photo }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>
          {cutText(item.title, 20)}
        </Text>

        <Text style={styles.daysTitle}>
          Dias da semana:
        </Text>
        <DaysLabel dates={item.dates} />

        <Button
          onPress={action}
          contentStyle={{ height: vs(30), width: '100%' }}
          labelStyle={{ fontSize: RFValue(12) }}
          mode="contained"
          style={{ marginBottom: 5 }}
        >
          Editar
        </Button>
        <Button
          onPress={secundaryAction}
          contentStyle={{ height: vs(30), width: '100%' }}
          labelStyle={{ fontSize: RFValue(12) }}
          mode="outlined"
          style={{ borderColor: colors.primary, borderWidth: 1 }}
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
    elevation: 4,
    borderRadius: 3,
    padding: 15,
    marginBottom: 20,
  },
  image: {
    width: s(120),
    height: vs(130),
    borderRadius: 2,
    alignSelf: 'center',
  },
  content: {
    justifyContent: 'space-between',
    marginLeft: 15,
    flex: 1,
  },
  title: {
    fontSize: RFValue(15),
    fontFamily: 'Roboto-Bold',
  },
  daysTitle: {
    fontSize: RFValue(12),
  },
})

export default AnnouncementCard
