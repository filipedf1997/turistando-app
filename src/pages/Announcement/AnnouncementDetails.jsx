import React from 'react'
import { observer } from 'mobx-react'
import { StyleSheet, View, Image } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { vs } from 'react-native-size-matters'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize'
import {
  Container, Content, HeaderBarAnnoucementDetail, CircleFirstLetter, DaysButton, Comments,
} from '../../components'

const AnnouncementDetails = observer(({ navigation, route }) => {
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
          arrowAction={() => {
            store.resetStore()
            navigation.goBack()
          }}
          onlyArrow
        />
        <Image defaultSource={require('../../images/imageDefault.png')} source={{ uri: store.announcement.photo }} style={styles.image} />
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.primary, marginTop: 10 }]}>
            {store.announcement.title}
          </Text>
          <Text style={[styles.title, { color: colors.primary }]}>
            {store.announcement.amountText}
          </Text>

          <View style={styles.rowWrapper}>
            <Text style={styles.text}>
              Avaliaçōes:
            </Text>
            <Entypo name="star" size={15} color={colors.orange} style={styles.icon} />
            <Text style={[styles.rating, { color: colors.orange }]}>
              {`${store.announcement.rating.length ? renderRating(store.announcement.rating) : 0}`}
            </Text>
            <Text style={styles.numberRating}>
              {`(${store.announcement.rating.length ? store.announcement.rating.length : 0})`}
            </Text>
          </View>

          <Text style={styles.text}>
            {store.announcement.description}
          </Text>

          <View style={[styles.nameWrapper, styles.nameWrapperDescription]}>
            <CircleFirstLetter name={store.announcement.ownerName} />
            <Text style={[styles.name, styles.text]}>
              {store.announcement.ownerName}
            </Text>
          </View>
          <Text style={[styles.text, { marginBottom: 10 }]}>
            {store.announcement.ownerDescription}
          </Text>

          <Text style={styles.text}>
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

          <View style={styles.rowWrapper}>
            <MaterialCommunityIcons name="comment-text-multiple" size={20} color={colors.black} />
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
    </Container>
  )
})

const styles = StyleSheet.create({
  container: { paddingHorizontal: 0 },
  content: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
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
    fontSize: RFValue(22),
    fontFamily: 'Roboto-Bold',
    flex: 1,
  },
  text: {
    fontSize: RFValue(14),
    lineHeight: RFValue(20),
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
  numberRating: {
    fontSize: RFValue(14),
    opacity: 0.6,
  },
  name: { marginLeft: 5 },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  rating: {
    fontSize: RFValue(14),
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
    marginBottom: 10,
  },
  comments: {
    marginLeft: 7,
    fontSize: RFValue(14),
    fontFamily: 'Roboto-Bold',
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
