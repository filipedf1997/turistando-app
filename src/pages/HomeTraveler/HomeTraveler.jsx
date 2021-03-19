import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { StyleSheet, FlatList } from 'react-native'
import { ActivityIndicator, useTheme } from 'react-native-paper'
import {
  Container, HeaderBarLogo, AnnouncementCardTraveler, ModalFeedback, EmptySearch,
} from '../../components'
import HomeTravelerStore from './store/HomeTravelerStore'

const HomeTraveler = observer(({ navigation }) => {
  const [store] = useState(() => new HomeTravelerStore())
  const { colors } = useTheme()

  function renderItem(item) {
    return (
      <AnnouncementCardTraveler
        key={item.id}
        item={item}
        action={() => {
          store.announcement = item
          navigation.navigate('AnnouncementDetails', { store })
        }}
      />
    )
  }

  useEffect(() => {
    store.getAnnouncements()
  }, [])

  return (
    <Container style={[styles.container, { backgroundColor: colors.white }]}>
      <HeaderBarLogo withFilter action={() => navigation.navigate('Filter', { store })} />
      {store.isFetching ? <ActivityIndicator style={styles.activityIndicator} /> : (
        store.announcements.length ? (
          <FlatList
            data={store.announcements}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item) => item.id}
            onEndReached={() => store.getMoreAnnouncements()}
            onEndReachedThreshold={0.3}
            contentContainerStyle={styles.flatList}
          />
        )
          : <EmptySearch />
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
})

export default HomeTraveler
