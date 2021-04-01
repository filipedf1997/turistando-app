import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { StyleSheet, View, RefreshControl } from 'react-native'
import { ActivityIndicator, useTheme, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  Container, Content, HeaderBarLogo, ReservationsProviderCard, ModalFeedback,
} from '../../components'
import HomeProviderStore from './store/HomeProviderStore'
import buyStatus from '../../utils/buyStatus'

const HomeProvider = observer(({ navigation }) => {
  const [store] = useState(() => new HomeProviderStore())
  const { colors } = useTheme()

  function handleAction(id, status) {
    store.requestFeedback = {
      visible: true,
      message: status === buyStatus.CONFIRMED
        ? 'Deseja Confirmar a reserva?'
        : 'Deseja Recusar a reserva?',
      onPress: async () => {
        store.requestFeedback.visible = false
        await store.updateReservationStatus(id, status)
        await store.getReservations()
        showFeedback(status)
      },
      btnName: 'Sim',
      secundaryAction: () => { store.requestFeedback.visible = false },
      secundaryName: 'Voltar',
      withoutIcon: true,
    }
  }

  function showFeedback(status) {
    store.requestFeedback = {
      visible: true,
      error: false,
      title: status === buyStatus.CONFIRMED
        ? 'Reserva confirmada com sucesso!'
        : '',
      message: status === buyStatus.CONFIRMED
        ? 'Entre em contato com o cliente para acertar os detalhes.'
        : 'Reserva recusada com sucesso!',
      onPress: () => { store.requestFeedback.visible = false },
      btnName: 'Ok',
    }
  }

  useEffect(() => {
    store.getReservations()
  }, [])

  return (
    <Container style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderBarLogo />
      {store.isFetching
        ? <ActivityIndicator style={styles.activityIndicator} />
        : (
          <Content
            scrollViewProps={{ contentContainerStyle: { paddingVertical: 20 } }}
            refreshControl={(
              <RefreshControl
                refreshing={store.isRefreshing}
                onRefresh={() => store.getReservations(true)}
                colors={[colors.primary]}
              />
            )}
          >
            { store.reservations.length
              ? store.reservations.map((item, index) => (
                <ReservationsProviderCard
                  key={index}
                  item={item}
                  acceptAction={() => handleAction(item.id, buyStatus.CONFIRMED)}
                  refuseAction={() => handleAction(item.id, buyStatus.REFUSED)}
                  contactAction={() => navigation.navigate('Chat', { name: item.travelerName, isSupport: false })}
                />
              )) : (
                <View style={styles.textWrapper}>
                  <Text style={styles.text}>Você ainda não possui anúncios com reserva</Text>
                </View>
              )}
          </Content>
        )}

      <ModalFeedback
        visible={store.requestFeedback.visible}
        title={store.requestFeedback.title}
        message={store.requestFeedback.message}
        btnName={store.requestFeedback.btnName}
        error={store.requestFeedback.error}
        success={!store.requestFeedback.error}
        onPress={store.requestFeedback.onPress}
        secundaryAction={store.requestFeedback.secundaryAction}
        secundaryName={store.requestFeedback.secundaryName}
        withoutIcon={store.requestFeedback.withoutIcon}
      />
    </Container>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default HomeProvider
