import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import {
  Container, Content, HeaderBarLogo, Button, AnnouncementCard, ModalFeedback,
} from '../../components'
import AnnouncementStore from './store/AnnouncementStore'

const Announcement = observer(({ navigation }) => {
  const [store] = useState(() => new AnnouncementStore())

  useEffect(() => {
    store.getAnnouncements()
  }, [])

  return (
    <Container style={styles.container}>
      <HeaderBarLogo />
      {store.isFetching ? <ActivityIndicator /> : (
        <Content scrollViewProps={{ contentContainerStyle: styles.content }}>
          {store.announcements.map((item) => (
            <AnnouncementCard
              key={item.id}
              item={item}
              action={() => {
                store.announcement = item
                navigation.navigate('EditAnnouncement', { store })
              }}
            />
          ))}
        </Content>
      )}
      <View style={styles.buttonWrapper}>
        <Button
          mode="contained"
          disabled={store.isFetching}
          onPress={() => navigation.navigate('NewAnnouncement', { store })}
        >
          Adicionar anúncio
        </Button>
      </View>

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
    justifyContent: 'space-between',
    backgroundColor: '#F2F2F2',
  },
  content: {
    paddingVertical: 20,
  },
  buttonWrapper: { padding: 20 },
})

export default Announcement
