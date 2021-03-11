import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { StyleSheet, FlatList } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import {
  Container, HeaderBarLogo, AnnouncementCardTraveler, ModalFeedback,
} from '../../components'
import HomeTravelerStore from './store/HomeTravelerStore'

const HomeTraveler = observer(({ navigation }) => {
  const [store] = useState(() => new HomeTravelerStore())

  function renderItem(item) {
    return (
      <AnnouncementCardTraveler
        key={item.id}
        item={item}
        action={() => {
          store.announcement = item
          // navigation.navigate('EditAnnouncement', { store })
        }}
      />
    )
  }

  useEffect(() => {
    store.getAnnouncements()
  }, [])

  return (
    <Container style={styles.container}>
      <HeaderBarLogo />
      {store.isFetching ? <ActivityIndicator style={styles.activityIndicator} /> : (
        <FlatList
          data={store.announcements}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item.id}
          onEndReached={() => store.getMoreAnnouncements()}
          onEndReachedThreshold={0.1}
          refreshing={store.isRefreshing}
          contentContainerStyle={styles.content}
        />
      )}
      {store.isRefreshing && <ActivityIndicator style={styles.loadFlatList} />}

      <ModalFeedback
        visible={store.requestFeedback.visible}
        message={store.requestFeedback.message}
        btnName={store.requestFeedback.btnName}
        error={store.requestFeedback.error}
        success={!store.requestFeedback.error}
        onPress={store.requestFeedback.onPress}
      />
    </Container>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  content: {
    padding: 20,
  },
  activityIndicator: {
    marginTop: 200,
  },
  buttonWrapper: { padding: 20 },
  loadFlatList: {
    marginVertical: 20,
    alignSelf: 'center',
  },
})

export default HomeTraveler
