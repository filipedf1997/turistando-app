import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { StyleSheet, FlatList, View } from 'react-native'
import { ActivityIndicator, useTheme, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  Container, HeaderBarLogo, ReservationsTravelerCard, ModalFeedback,
} from '../../components'
import ReservationsStore from './store/ReservationsStore'
import HomeTravelerStore from '../HomeTraveler/store/HomeTravelerStore'

const Reservations = observer(({ navigation }) => {
  const [store] = useState(() => new ReservationsStore())
  const [storeDetails] = useState(() => new HomeTravelerStore())
  const { colors } = useTheme()

  function renderItem(item) {
    return (
      <ReservationsTravelerCard
        item={item}
        seeDetails={() => {
          storeDetails.announcement = item.announcement
          navigation.navigate('AnnouncementDetails', { store: storeDetails })
        }}
        contact={() => navigation.navigate('Chat', { name: item.announcement.ownerName, isSupport: false })}
        rate={() => {
          store.announcement = item.announcement
          navigation.navigate('EvaluationScreen', { store })
        }}
      />
    )
  }

  useEffect(() => {
    store.getReservations()
  }, [])

  return (
    <Container style={[styles.container, { backgroundColor: colors.white }]}>
      <HeaderBarLogo />
      {store.isFetching
        ? <ActivityIndicator style={styles.activityIndicator} />
        : (
          store.reservations.length ? (
            <FlatList
              data={store.reservations}
              renderItem={({ item }) => renderItem(item)}
              keyExtractor={(item) => `${item.reservationDate.seconds}`}
              contentContainerStyle={styles.flatList}
            />
          )
            : (
              <View style={styles.textWrapper}>
                <Text style={styles.text}>Você ainda não possui reservas</Text>
              </View>
            )
        )}

      <ModalFeedback
        visible={store.requestFeedback.visible}
        message={store.requestFeedback.message}
        btnName={store.requestFeedback.btnName}
        error={store.requestFeedback.error}
        success={!store.requestFeedback.error}
        onPress={store.requestFeedback.onPress}
        secundaryAction={store.requestFeedback.secundaryAction}
        secundaryName={store.requestFeedback.secundaryName}
      />
    </Container>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    padding: 20,
  },
  activityIndicator: {
    marginTop: 200,
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: RFValue(18),
    textAlign: 'center',
    marginHorizontal: 20,
    opacity: 0.6,
  },
})

export default Reservations
